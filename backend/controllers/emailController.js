const nodemailer = require("nodemailer");

exports.sendEmail = async ({ to, subject, message }) => {
  try {
    // 1. Create test account for Ethereal
    const testAccount = await nodemailer.createTestAccount();

    // 2. Create transporter using Ethereal
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // 3. Set email options
    const mailOptions = {
      from: `"DreamShop" <no-reply@dreamshop.com>`,
      to,
      subject,
      html: `<p>${message}</p>`,
    };

    // 4. Send email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.messageId);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

    return {
      success: true,
      previewUrl: nodemailer.getTestMessageUrl(info), // show this in frontend for testing
    };

  } catch (err) {
    console.error("Email error:", err);
    return { success: false, error: err.message };
  }
};
