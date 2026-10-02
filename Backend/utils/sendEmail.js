const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 60000,
  greetingTimeout: 30000,
  socketTimeout: 60000,

  logger: true,
  debug: true,
});

const sendEmail = async (to, subject, text) => {
  try {
    console.log("========== EMAIL START ==========");
    console.log("From:", process.env.EMAIL_USER);
    console.log("To:", to);

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    console.log("EMAIL SENT SUCCESSFULLY");
    console.log(info.response);

    return info;
  } catch (err) {
    console.log("========== EMAIL ERROR ==========");
    console.log("Code:", err.code);
    console.log("Command:", err.command);
    console.log("Message:", err.message);

    throw err;
  }
};

module.exports = sendEmail;