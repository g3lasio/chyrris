import crypto from "crypto";
import fs from "fs";
import path from "path";
import type { Request, Response } from "express";

export type CaymusSubscriptionStatus = "none" | "pending" | "active" | "expired" | "past_due" | "cancelled";

export interface CaymusUser {
  phone: string;
  name: string;
  isOwner: boolean;
  registeredAt: string;
  lastLogin: string;
  subscriptionStatus: CaymusSubscriptionStatus;
  subscriptionExpiry?: string;
  subscriptionId?: string;
  customerId?: string;
  planInterval?: "month" | "year";
  paymentPastDueAt?: string;
  graceEndsAt?: string;
}

interface CaymusSession {
  phone: string;
  tokenHash: string;
  createdAt: string;
  lastUsedAt: string;
  expiresAt: string;
}

const DATA_DIR = path.join(process.cwd(), ".data");
const USERS_FILE = path.join(DATA_DIR, "caymus-users.json");
const SESSIONS_FILE = path.join(DATA_DIR, "caymus-sessions.json");

export const CAYMUS_GRACE_PERIOD_DAYS = 3;
const SESSION_DURATION_DAYS = Number(process.env.CAYMUS_SESSION_DURATION_DAYS || 30);

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

export function normalizePhone(phone: string): string {
  const digits = String(phone || "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return phone.trim().startsWith("+") ? `+${digits}` : `+1${digits}`;
}

function phoneKey(phone: string): string {
  return normalizePhone(phone).replace(/\D/g, "");
}

export function phoneMatches(left: string, right: string): boolean {
  const a = phoneKey(left);
  const b = phoneKey(right);
  return !!a && !!b && a === b;
}

export function getOwnerPhones(): string[] {
  const configured = process.env.CAYMUS_OWNER_PHONES || process.env.CAYMUS_OWNER_PHONE || "+12025493519";
  return configured
    .split(",")
    .map((phone) => normalizePhone(phone.trim()))
    .filter(Boolean);
}

export function isOwnerPhone(phone: string): boolean {
  return getOwnerPhones().some((ownerPhone) => phoneMatches(ownerPhone, phone));
}

function normalizeUser(raw: any): CaymusUser {
  const phone = normalizePhone(raw?.phone || "");
  const owner = isOwnerPhone(phone);
  return {
    phone,
    name: typeof raw?.name === "string" ? raw.name : "",
    isOwner: owner,
    registeredAt: raw?.registeredAt || new Date().toISOString(),
    lastLogin: raw?.lastLogin || new Date().toISOString(),
    subscriptionStatus: owner ? "active" : (raw?.subscriptionStatus || "none"),
    subscriptionExpiry: raw?.subscriptionExpiry,
    subscriptionId: raw?.subscriptionId,
    customerId: raw?.customerId,
    planInterval: raw?.planInterval === "month" ? "month" : raw?.planInterval === "year" ? "year" : undefined,
    paymentPastDueAt: raw?.paymentPastDueAt,
    graceEndsAt: raw?.graceEndsAt,
  };
}

export function loadCaymusUsers(): CaymusUser[] {
  ensureDataDir();
  if (!fs.existsSync(USERS_FILE)) return [];
  try {
    const parsed = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
    const values = Array.isArray(parsed) ? parsed : Object.values(parsed || {});
    return values.map(normalizeUser).filter((user) => !!user.phone);
  } catch (error) {
    console.error("Error loading Caymus users:", error);
    return [];
  }
}

export function saveCaymusUsers(users: CaymusUser[]): void {
  ensureDataDir();
  const normalized = users.map(normalizeUser).filter((user) => !!user.phone);
  fs.writeFileSync(USERS_FILE, JSON.stringify(normalized, null, 2));
}

export function findCaymusUser(phone: string): CaymusUser | undefined {
  return loadCaymusUsers().find((user) => phoneMatches(user.phone, phone));
}

export function upsertCaymusUser(phone: string, updates: Partial<CaymusUser> = {}): CaymusUser {
  const normalizedPhone = normalizePhone(phone);
  const users = loadCaymusUsers();
  const idx = users.findIndex((user) => phoneMatches(user.phone, normalizedPhone));
  const owner = isOwnerPhone(normalizedPhone);
  const existing = idx >= 0 ? users[idx] : undefined;
  const user = normalizeUser({
    phone: normalizedPhone,
    name: existing?.name || "",
    registeredAt: existing?.registeredAt || new Date().toISOString(),
    lastLogin: existing?.lastLogin || new Date().toISOString(),
    subscriptionStatus: existing?.subscriptionStatus || "none",
    ...existing,
    ...updates,
    isOwner: owner,
  });
  users[idx >= 0 ? idx : users.length] = user;
  saveCaymusUsers(users);
  return user;
}

function loadSessions(): CaymusSession[] {
  ensureDataDir();
  if (!fs.existsSync(SESSIONS_FILE)) return [];
  try {
    const parsed = JSON.parse(fs.readFileSync(SESSIONS_FILE, "utf-8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveSessions(sessions: CaymusSession[]): void {
  ensureDataDir();
  fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions, null, 2));
}

function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function createCaymusSession(phone: string): { token: string; expiresAt: string } {
  const normalizedPhone = normalizePhone(phone);
  const token = crypto.randomBytes(32).toString("base64url");
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000).toISOString();
  const activeSessions = loadSessions().filter((session) => new Date(session.expiresAt) > now);
  activeSessions.push({
    phone: normalizedPhone,
    tokenHash: hashToken(token),
    createdAt: now.toISOString(),
    lastUsedAt: now.toISOString(),
    expiresAt,
  });
  saveSessions(activeSessions);
  return { token, expiresAt };
}

export function extractSessionToken(req: Request): string | null {
  const headerToken = req.header("x-caymus-session-token");
  const auth = req.header("authorization") || "";
  const bearer = auth.toLowerCase().startsWith("bearer ") ? auth.slice(7).trim() : "";
  const queryToken = typeof req.query.sessionToken === "string" ? req.query.sessionToken : "";
  return headerToken || bearer || queryToken || null;
}

export function validateCaymusSession(req: Request, phone?: string): { valid: boolean; phone?: string; expiresAt?: string } {
  const token = extractSessionToken(req);
  if (!token) return { valid: false };
  const now = new Date();
  const tokenHash = hashToken(token);
  let changed = false;
  const sessions = loadSessions().filter((session) => {
    const active = new Date(session.expiresAt) > now;
    if (!active) changed = true;
    return active;
  });
  const session = sessions.find((candidate) => candidate.tokenHash === tokenHash);
  if (!session) {
    if (changed) saveSessions(sessions);
    return { valid: false };
  }
  if (phone && !phoneMatches(session.phone, phone)) return { valid: false };
  session.lastUsedAt = now.toISOString();
  saveSessions(sessions);
  return { valid: true, phone: session.phone, expiresAt: session.expiresAt };
}

export function requireCaymusSession(req: Request, res: Response, phone?: string): { phone: string; expiresAt?: string } | null {
  const session = validateCaymusSession(req, phone);
  if (!session.valid || !session.phone) {
    res.status(401).json({ success: false, message: "Valid Caymus session required" });
    return null;
  }
  return { phone: session.phone, expiresAt: session.expiresAt };
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

export function getCaymusAccessStatus(phone: string): {
  isActive: boolean;
  hasAccess: boolean;
  status: CaymusSubscriptionStatus | "owner";
  expiry?: string;
  hasCustomer: boolean;
  isOwner: boolean;
  isInGracePeriod: boolean;
  graceEndsAt?: string;
  daysRemaining?: number;
  planInterval?: "month" | "year";
} {
  const normalizedPhone = normalizePhone(phone);
  const owner = isOwnerPhone(normalizedPhone);
  const user = findCaymusUser(normalizedPhone);

  if (owner) {
    return {
      isActive: true,
      hasAccess: true,
      status: "owner",
      hasCustomer: !!user?.customerId,
      isOwner: true,
      isInGracePeriod: false,
      planInterval: user?.planInterval,
    };
  }

  if (!user) {
    return { isActive: false, hasAccess: false, status: "none", hasCustomer: false, isOwner: false, isInGracePeriod: false };
  }

  const now = new Date();
  const expiry = user.subscriptionExpiry ? new Date(user.subscriptionExpiry) : null;
  const activeByExpiry = user.subscriptionStatus === "active" && !!expiry && expiry > now;

  let graceEndsAt = user.graceEndsAt;
  if (user.subscriptionStatus === "past_due" && !graceEndsAt) {
    const base = user.paymentPastDueAt ? new Date(user.paymentPastDueAt) : expiry && !Number.isNaN(expiry.getTime()) ? expiry : now;
    graceEndsAt = addDays(base, CAYMUS_GRACE_PERIOD_DAYS).toISOString();
  }

  const isInGracePeriod = user.subscriptionStatus === "past_due" && !!graceEndsAt && new Date(graceEndsAt) > now;
  const isActive = activeByExpiry || isInGracePeriod;
  const expiryForRemaining = isInGracePeriod ? new Date(graceEndsAt!) : expiry;
  const daysRemaining = expiryForRemaining && expiryForRemaining > now
    ? Math.ceil((expiryForRemaining.getTime() - now.getTime()) / (24 * 60 * 60 * 1000))
    : undefined;

  return {
    isActive,
    hasAccess: isActive,
    status: user.subscriptionStatus,
    expiry: user.subscriptionExpiry,
    hasCustomer: !!user.customerId,
    isOwner: false,
    isInGracePeriod,
    graceEndsAt,
    daysRemaining,
    planInterval: user.planInterval,
  };
}
