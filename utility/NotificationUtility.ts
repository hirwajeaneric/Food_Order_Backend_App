// Email

// Notification

// OTP
/**
 * Generate an OTP with a given validity period.
 * @returns an object containing the OTP and its expiry date
 */
export const GenerateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + (30 * 60 * 1000));

    return {otp, expiry }
}

/**
 * Sends an OTP (One-Time Password) to the provided phone number.
 * @param otp - The OTP to be sent.
 * @param toPhoneNumber - The phone number to receive the OTP.
 * @returns A promise that resolves to the Twilio message response.
 */
export const onRequestOTP = async (otp: number, toPhoneNumber: string) => {
    const accountSid = '';
    const authToken = '';
    const client = require('twilio')(accountSid, authToken);

    const response = await client.messages.create({
        body: `Your OTP is ${otp}`,
        from: `+250780599859`,
        to: `+250${toPhoneNumber}`,
    });

    return response;
}

// Payment notification or emails