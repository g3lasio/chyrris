/**
 * Apple In-App Purchase Receipt Validation Service
 * Handles validation of Apple subscription receipts
 * 
 * Environment variables required:
 * - APPLE_SHARED_SECRET (from App Store Connect)
 * - APPLE_BUNDLE_ID (com.chyrris.caymus-tanks)
 */

interface AppleConfig {
  sharedSecret: string;
  bundleId: string;
}

interface ValidateReceiptRequest {
  receiptData: string;
  productId: string;
  transactionId: string;
  platform: 'ios';
}

interface ValidateReceiptResponse {
  success: boolean;
  isActive: boolean;
  expiresAt?: number;
  productId?: string;
  transactionId?: string;
  message?: string;
  error?: string;
}

interface SubscriptionInfo {
  productId: string;
  transactionId: string;
  originalTransactionId: string;
  purchaseDate: number;
  expiresDate: number;
  isActive: boolean;
  autoRenewStatus: boolean;
}

/**
 * Get Apple IAP configuration from environment variables
 */
function getAppleConfig(): AppleConfig {
  const sharedSecret = process.env.APPLE_SHARED_SECRET;
  const bundleId = process.env.APPLE_BUNDLE_ID || 'com.chyrris.caymus-tanks';

  if (!sharedSecret) {
    throw new Error('Missing APPLE_SHARED_SECRET environment variable');
  }

  return {
    sharedSecret,
    bundleId,
  };
}

/**
 * Validate receipt with Apple's verification servers
 * 
 * Apple has two endpoints:
 * - Production: https://buy.itunes.apple.com/verifyReceipt
 * - Sandbox: https://sandbox.itunes.apple.com/verifyReceipt
 * 
 * We try production first, then fall back to sandbox if status is 21007
 */
async function verifyReceiptWithApple(
  receiptData: string,
  sharedSecret: string,
  useSandbox: boolean = false
): Promise<any> {
  const endpoint = useSandbox
    ? 'https://sandbox.itunes.apple.com/verifyReceipt'
    : 'https://buy.itunes.apple.com/verifyReceipt';

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'receipt-data': receiptData,
      'password': sharedSecret,
      'exclude-old-transactions': true,
    }),
  });

  if (!response.ok) {
    throw new Error(`Apple verification failed with status ${response.status}`);
  }

  return await response.json();
}

/**
 * Parse subscription info from Apple receipt response
 */
function parseSubscriptionInfo(appleResponse: any, productId: string): SubscriptionInfo | null {
  try {
    // For auto-renewable subscriptions, check latest_receipt_info
    const latestReceiptInfo = appleResponse.latest_receipt_info;
    
    if (!latestReceiptInfo || latestReceiptInfo.length === 0) {
      return null;
    }

    // Find the subscription matching the product ID
    const subscription = latestReceiptInfo.find(
      (item: any) => item.product_id === productId
    );

    if (!subscription) {
      return null;
    }

    // Parse dates (Apple returns milliseconds as strings)
    const purchaseDate = parseInt(subscription.purchase_date_ms);
    const expiresDate = parseInt(subscription.expires_date_ms);
    const now = Date.now();

    // Check if subscription is currently active
    const isActive = expiresDate > now;

    // Check auto-renew status from pending_renewal_info
    let autoRenewStatus = false;
    if (appleResponse.pending_renewal_info) {
      const renewalInfo = appleResponse.pending_renewal_info.find(
        (item: any) => item.product_id === productId
      );
      autoRenewStatus = renewalInfo?.auto_renew_status === '1';
    }

    return {
      productId: subscription.product_id,
      transactionId: subscription.transaction_id,
      originalTransactionId: subscription.original_transaction_id,
      purchaseDate,
      expiresDate,
      isActive,
      autoRenewStatus,
    };
  } catch (error) {
    console.error('Error parsing subscription info:', error);
    return null;
  }
}

/**
 * Validate an Apple In-App Purchase receipt
 * 
 * This function:
 * 1. Validates the receipt with Apple's servers
 * 2. Checks if the subscription is active
 * 3. Returns subscription details
 */
export async function validateAppleReceipt(
  request: ValidateReceiptRequest
): Promise<ValidateReceiptResponse> {
  try {
    const config = getAppleConfig();
    
    // Step 1: Verify receipt with Apple (try production first)
    let appleResponse = await verifyReceiptWithApple(
      request.receiptData,
      config.sharedSecret,
      false
    );

    // If status is 21007, receipt is from sandbox - try sandbox endpoint
    if (appleResponse.status === 21007) {
      console.log('Receipt is from sandbox, retrying with sandbox endpoint');
      appleResponse = await verifyReceiptWithApple(
        request.receiptData,
        config.sharedSecret,
        true
      );
    }

    // Step 2: Check response status
    if (appleResponse.status !== 0) {
      // Status codes: https://developer.apple.com/documentation/appstorereceipts/status
      const errorMessages: { [key: number]: string } = {
        21000: 'The App Store could not read the JSON object you provided',
        21002: 'The data in the receipt-data property was malformed',
        21003: 'The receipt could not be authenticated',
        21004: 'The shared secret you provided does not match',
        21005: 'The receipt server is not currently available',
        21006: 'This receipt is valid but the subscription has expired',
        21008: 'This receipt is from the production environment, but you sent it to the test environment',
        21009: 'Internal data access error',
        21010: 'The user account cannot be found or has been deleted',
      };

      const errorMessage = errorMessages[appleResponse.status] || `Unknown error (status ${appleResponse.status})`;

      return {
        success: false,
        isActive: false,
        message: errorMessage,
        error: `APPLE_STATUS_${appleResponse.status}`,
      };
    }

    // Step 3: Verify bundle ID matches
    if (appleResponse.receipt?.bundle_id !== config.bundleId) {
      return {
        success: false,
        isActive: false,
        message: 'Bundle ID mismatch',
        error: 'BUNDLE_ID_MISMATCH',
      };
    }

    // Step 4: Parse subscription info
    const subscriptionInfo = parseSubscriptionInfo(appleResponse, request.productId);

    if (!subscriptionInfo) {
      return {
        success: false,
        isActive: false,
        message: 'Subscription not found in receipt',
        error: 'SUBSCRIPTION_NOT_FOUND',
      };
    }

    // Step 5: Return validation result
    return {
      success: true,
      isActive: subscriptionInfo.isActive,
      expiresAt: subscriptionInfo.expiresDate,
      productId: subscriptionInfo.productId,
      transactionId: subscriptionInfo.transactionId,
      message: subscriptionInfo.isActive
        ? 'Subscription is active'
        : 'Subscription has expired',
    };
  } catch (error) {
    console.error('Error validating Apple receipt:', error);
    return {
      success: false,
      isActive: false,
      message: 'Receipt validation failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Simple in-memory cache for validated receipts
 * In production, use Redis or a database
 */
const receiptCache = new Map<string, {
  isActive: boolean;
  expiresAt: number;
  validatedAt: number;
}>();

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Check subscription status with caching
 * This reduces calls to Apple's servers
 */
export async function checkSubscriptionStatus(
  transactionId: string,
  receiptData: string,
  productId: string
): Promise<ValidateReceiptResponse> {
  // Check cache first
  const cached = receiptCache.get(transactionId);
  if (cached && Date.now() - cached.validatedAt < CACHE_TTL_MS) {
    return {
      success: true,
      isActive: cached.isActive && cached.expiresAt > Date.now(),
      expiresAt: cached.expiresAt,
      productId,
      transactionId,
      message: 'Cached result',
    };
  }

  // Validate with Apple
  const result = await validateAppleReceipt({
    receiptData,
    productId,
    transactionId,
    platform: 'ios',
  });

  // Cache the result
  if (result.success && result.expiresAt) {
    receiptCache.set(transactionId, {
      isActive: result.isActive,
      expiresAt: result.expiresAt,
      validatedAt: Date.now(),
    });
  }

  return result;
}

/**
 * Handle Apple Server-to-Server Notifications
 * These are webhooks sent by Apple when subscription status changes
 * 
 * Notification types:
 * - INITIAL_BUY: First subscription purchase
 * - DID_RENEW: Subscription renewed
 * - DID_FAIL_TO_RENEW: Renewal failed
 * - DID_CHANGE_RENEWAL_STATUS: Auto-renew toggled
 * - CANCEL: Subscription cancelled
 * - REFUND: Purchase refunded
 */
export async function handleAppleNotification(notificationPayload: any): Promise<void> {
  try {
    const notificationType = notificationPayload.notification_type;
    const receiptData = notificationPayload.unified_receipt?.latest_receipt;
    
    console.log(`Received Apple notification: ${notificationType}`);

    // Clear cache for this transaction
    if (notificationPayload.unified_receipt?.latest_receipt_info) {
      const transactions = notificationPayload.unified_receipt.latest_receipt_info;
      transactions.forEach((transaction: any) => {
        receiptCache.delete(transaction.transaction_id);
      });
    }

    // In a real implementation, you would:
    // 1. Update the user's subscription status in your database
    // 2. Send notifications to the user
    // 3. Log the event for analytics

    // Example:
    switch (notificationType) {
      case 'INITIAL_BUY':
        console.log('New subscription purchased');
        break;
      case 'DID_RENEW':
        console.log('Subscription renewed');
        break;
      case 'DID_FAIL_TO_RENEW':
        console.log('Subscription renewal failed');
        break;
      case 'CANCEL':
        console.log('Subscription cancelled');
        break;
      case 'REFUND':
        console.log('Purchase refunded');
        break;
    }
  } catch (error) {
    console.error('Error handling Apple notification:', error);
  }
}
