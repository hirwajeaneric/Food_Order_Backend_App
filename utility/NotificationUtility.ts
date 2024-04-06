// Email

// Notification

// OTP
export const GenerateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + (30 * 60 * 1000));

    return {otp, expiry }
}


// Payment notification or emails