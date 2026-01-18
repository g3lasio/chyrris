/**
 * Twilio OTP Service
 * Handles sending and verifying OTP codes via Twilio Verify API
 * 
 * Environment variables required:
 * - TWILIO_ACCOUNT_SID
 * - TWILIO_AUTH_TOKEN
 * - TWILIO_VERIFY_SERVICE_SID
 */

interface TwilioConfig {
  accountSid: string;
  authToken: string;
  verifyServiceSid: string;
}

interface SendOTPResult {
  success: boolean;
  message: string;
  error?: string;
}

interface VerifyOTPResult {
  success: boolean;
  message: string;
  status?: string;
  error?: string;
}

/**
 * Get Twilio configuration from environment variables
 */
function getTwilioConfig(): TwilioConfig {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

  if (!accountSid || !authToken || !verifyServiceSid) {
    throw new Error('Missing Twilio configuration. Please set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_VERIFY_SERVICE_SID environment variables.');
  }

  return {
    accountSid,
    authToken,
    verifyServiceSid,
  };
}

/**
 * Format phone number to E.164 format
 */
function formatPhoneNumber(phone: string): string {
  // Remove all non-numeric characters except +
  let cleaned = phone.replace(/[^\d+]/g, '');
  
  // If doesn't start with +, assume USA and add +1
  if (!cleaned.startsWith('+')) {
    if (cleaned.length === 10) {
      cleaned = '+1' + cleaned;
    } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
      cleaned = '+' + cleaned;
    } else {
      // Assume USA if unclear
      cleaned = '+1' + cleaned;
    }
  }
  
  return cleaned;
}

/**
 * Send OTP code to phone number via Twilio Verify
 */
export async function sendOTP(phoneNumber: string): Promise<SendOTPResult> {
  try {
    const config = getTwilioConfig();
    const formattedPhone = formatPhoneNumber(phoneNumber);
    
    // Create Basic Auth credentials
    const credentials = Buffer.from(`${config.accountSid}:${config.authToken}`).toString('base64');
    
    const response = await fetch(
      `https://verify.twilio.com/v2/Services/${config.verifyServiceSid}/Verifications`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `To=${encodeURIComponent(formattedPhone)}&Channel=sms`,
      }
    );
    
    const data = await response.json();
    
    if (response.ok && data.status === 'pending') {
      return {
        success: true,
        message: 'OTP sent successfully',
      };
    } else {
      console.error('Twilio send OTP error:', data);
      return {
        success: false,
        message: 'Failed to send OTP',
        error: data.message || 'Unknown error',
      };
    }
  } catch (error) {
    console.error('Error sending OTP:', error);
    return {
      success: false,
      message: 'Connection error',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Verify OTP code via Twilio Verify
 */
export async function verifyOTP(phoneNumber: string, code: string): Promise<VerifyOTPResult> {
  try {
    const config = getTwilioConfig();
    const formattedPhone = formatPhoneNumber(phoneNumber);
    
    // Create Basic Auth credentials
    const credentials = Buffer.from(`${config.accountSid}:${config.authToken}`).toString('base64');
    
    const response = await fetch(
      `https://verify.twilio.com/v2/Services/${config.verifyServiceSid}/VerificationCheck`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `To=${encodeURIComponent(formattedPhone)}&Code=${code}`,
      }
    );
    
    const data = await response.json();
    
    if (response.ok && data.status === 'approved') {
      return {
        success: true,
        message: 'OTP verified successfully',
        status: data.status,
      };
    } else {
      console.error('Twilio verify OTP error:', data);
      return {
        success: false,
        message: 'Invalid or expired code',
        status: data.status,
        error: data.message || 'Verification failed',
      };
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return {
      success: false,
      message: 'Connection error',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
