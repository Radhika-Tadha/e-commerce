require("dotenv").config();
const { sendEmail } = require("./controllers/emailController");


(async () => {
    const result = await sendEmail({
        from: process.env.GMAIL_USER,
        to: "youremail@gmail.com", // 👈 put any email here to test
        subject: "Test Email from DreamShop",
        message: "<h1>Hello!</h1><p>This is a test email from Nodemailer.</p>"
    });

    console.log("Email send result:", result);
})();