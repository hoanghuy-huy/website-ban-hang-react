const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmailOrder = async (to, subject, text, html) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true cho port 465
    auth: {
      user: "huynhhoanghuy221122@gmail.com", // Địa chỉ email của bạn
      pass: "kmgd puxj mech fpmk", // Mật khẩu email của bạn
    },
  });

  const mailOptions = {
    from: "huynhhoanghuy221122@gmail.com", // Địa chỉ email người gửi
    to, // Địa chỉ email người nhận
    subject, // Tiêu đề email
    text, // Nội dung email dạng text
    html, // Nội dung email dạng HTML
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return true;
  } catch (error) {
    console.error("Error sending email: ", error);
    return false; 
  }
};

module.exports = {
  sendEmailOrder,
};
