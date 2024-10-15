const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmailOrder = async () => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.EMAIL_ACCOUNT,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL_ACCOUNT, // sender address
    to: process.env.EMAIL_ACCOUNT, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
};
module.exports = {
  sendEmailOrder,
};
