const nodemailer = require("nodemailer");

exports.sendEmail = async ({ from, to, subject, message }) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS // App Password from Google
            }
        });

        await transporter.sendMail({
            from,
            to,
            subject,
            html: message
        });

        return { success: true };
    } catch (error) {
        console.error("Email sending failed:", error);
        return { success: false, error: error.message };
    }
};
