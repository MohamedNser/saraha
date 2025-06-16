import nodemailer from "nodemailer";

export const sendEmails = async (dest, subject, message) => {
    
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.senderEmail,
            pass: process.env.senderEmailPassword,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const info = await transporter.sendMail({
        from: process.env.senderEmail,
        to: dest,
        subject,
        html: message, // HTML body
    });

    console.log("Message sent:", info.messageId);
};