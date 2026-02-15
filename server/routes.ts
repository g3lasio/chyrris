import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { sendOTP, verifyOTP } from "./twilio";
import { moldoctorChat, analyzeLabDocument } from "./moldoctor";
import { validateAppleReceipt, checkSubscriptionStatus, handleAppleNotification } from "./apple-iap";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Twilio OTP endpoints for Caymus Tanks mobile app
  app.post("/api/otp/send", async (req, res) => {
    try {
      const { phoneNumber } = req.body;
      
      if (!phoneNumber) {
        return res.status(400).json({
          success: false,
          message: "Phone number is required"
        });
      }
      
      const result = await sendOTP(phoneNumber);
      
      return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      console.error('Error in /api/otp/send:', error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while sending OTP"
      });
    }
  });

  app.post("/api/otp/verify", async (req, res) => {
    try {
      const { phoneNumber, code } = req.body;
      
      if (!phoneNumber || !code) {
        return res.status(400).json({
          success: false,
          message: "Phone number and code are required"
        });
      }
      
      const result = await verifyOTP(phoneNumber, code);
      
      return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      console.error('Error in /api/otp/verify:', error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while verifying OTP"
      });
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = contactSchema.parse(req.body);
      
      // For now, we'll just return success
      // In a real application, this would store the message 
      // or send an email notification
      
      return res.status(200).json({
        success: true,
        message: "Message received successfully"
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors
        });
      }
      
      return res.status(500).json({
        success: false,
        message: "An error occurred while processing your request"
      });
    }
  });

  // MolDoctor API endpoints for Pocima Salvaje mobile app
  app.post("/api/moldoctor/chat", moldoctorChat);
  app.post("/api/moldoctor/analyze-lab", analyzeLabDocument);

  // Apple In-App Purchase endpoints for Caymus Tanks mobile app
  app.post("/api/subscription/validate", async (req, res) => {
    try {
      const { platform, productId, transactionReceipt, orderId } = req.body;
      
      if (platform !== 'ios') {
        return res.status(400).json({
          success: false,
          message: "Only iOS platform is supported"
        });
      }
      
      if (!transactionReceipt || !productId || !orderId) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields: transactionReceipt, productId, orderId"
        });
      }
      
      const result = await validateAppleReceipt({
        receiptData: transactionReceipt,
        productId,
        transactionId: orderId,
        platform: 'ios',
      });
      
      return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      console.error('Error in /api/subscription/validate:', error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while validating subscription"
      });
    }
  });

  app.post("/api/subscription/check", async (req, res) => {
    try {
      const { transactionId, receiptData, productId } = req.body;
      
      if (!transactionId || !receiptData || !productId) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields: transactionId, receiptData, productId"
        });
      }
      
      const result = await checkSubscriptionStatus(transactionId, receiptData, productId);
      
      return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      console.error('Error in /api/subscription/check:', error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while checking subscription"
      });
    }
  });

  // Apple Server-to-Server Notification endpoint (webhook)
  app.post("/api/subscription/apple-webhook", async (req, res) => {
    try {
      await handleAppleNotification(req.body);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error in /api/subscription/apple-webhook:', error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while processing notification"
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, timestamp: Date.now() });
  });

  const httpServer = createServer(app);

  return httpServer;
}
