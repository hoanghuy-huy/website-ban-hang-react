import db from "../models/index";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import groupRoleService from "./groupRoleService";
import { createToken } from "../middleware/jwtUser";
const nodemailer = require("nodemailer");

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

class authService {
  async checkEmailExist(emailUser) {
    const user = await db.User.findOne({
      where: {
        email: emailUser,
      },
    });

    if (user) return true;

    return false;
  }

  async checkPhoneExist(phoneUser) {
    const user = await db.User.findOne({
      where: {
        phone: phoneUser,
      },
    });

    if (user) return true;

    return false;
  }

  hashPassword(password) {
    let hashPassword = bcrypt.hashSync(password, salt);

    return hashPassword;
  }

  comparePassword(password, userPassword) {
    return bcrypt.compareSync(password, userPassword);
  }

  async registerNewUser(rawData) {
    try {
      //Check email and phone already exists
      let isEmailExist = await this.checkEmailExist(rawData.email);

      if (isEmailExist)
        return {
          EM: "Tài khoản này đã tồn tại rồi",
          EC: 1,
        };

      if (rawData.password && rawData.password.length < 4) {
        return {
          EM: "Mật khẩu phải lớn hơn 3 kí tự",
          EC: 1,
        };
      } else if (!/[a-zA-Z]/.test(rawData.password)) {
        return {
          EM: "Mật khẩu phải chứa ít nhất một ký tự",
          EC: 1,
        };
      }
      // hash password
      let hashPass = this.hashPassword(rawData.password);

      let defaultGroupUser = await db.Group.findOne({
        where: { name: "customer" },
      });
      console.log(rawData);
      // Create new user
      await db.User.create({
        username: rawData.username,
        phone: rawData.phone,
        email: rawData.email,
        password: hashPass,
        groupId: defaultGroupUser.id,
      });

      return {
        EM: "Đăng kí thành công",
        EC: 0,
        DT: 1,
      };
    } catch (error) {
      console.log(error);
      return {
        EM: " Something wrong in service",
        EC: 2,
      };
    }
  }

  async handleLogin(rawData) {
    try {
      const { valueLogin, password } = rawData;

      const user = await db.User.findOne({
        where: {
          [Op.or]: [{ email: valueLogin }, { phone: valueLogin }],
        },
      });

      if (user) {
        let checkPass = this.comparePassword(password, user.password);
        if (checkPass) {
          let roles = await groupRoleService.getGroupWithRoleUser(user.groupId);
          let group = await db.Group.findOne({
            where: { id: user.groupId },
          });

          let payload = {
            id: user.id,
            email: user.email,
            username: user.username,
            groupWithRoleUser: roles,
            groupId: user.groupId,
            userGroup: group.name,
          };

          let token = createToken(payload);

          return {
            EM: "Sign in successfully !!",
            EC: 0,
            DT: {
              userId: user.id,
              token,
              groupWithRoleUser: roles,
              email: user.email,
              username: user.username,
              userGroup: group.name,
            },
          };
        }

        return {
          EM: "Email/Phone or password is incorrect",
          EC: 1,
          DT: "",
        };
      }

      return {
        EM: "Email/Phone or password is incorrect",
        EC: 1,
        DT: "",
      };
    } catch (error) {
      console.log(error);
      return {
        EM: " Something wrong in service",
        EC: 2,
      };
    }
  }

  async handleSendEmailFunc(rawData) {
    try {
      const { email, dataToSendEmail } = rawData;

      const user = await db.User.findOne({
        where: { id: rawData.userId },
      });

      // Tạo transporter cho Nodemailer
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true cho port 465
        auth: {
          user: "huynhhoanghuy221122@gmail.com", // Địa chỉ email của bạn
          pass: "kmgd puxj mech fpmk", // Mật khẩu email của bạn
        },
      });
      console.log(dataToSendEmail);
      const productDetails = dataToSendEmail.productList
        .map(
          (item) => `
        <li>
          Tên sản phẩm: ${item.productName} - Số lượng: ${item.quantity} - Giá: ${item.price} VND
        </li>
      `
        )
        .join("");

      const emailHtml = `
        <div style="font-family: Arial, sans-serif;">
          <h1>Cảm ơn bạn đã đặt hàng!</h1>
          <h3>Chi tiết sản phẩm:</h3>
          <ul>
            ${productDetails}
          </ul>
          <p><strong>Tổng giá:</strong> ${
            dataToSendEmail.totalPrice || 0
          } VND</p>
          <p><strong>Phương thức thanh toán:</strong> ${
            dataToSendEmail.methodPayment || "Chưa xác định"
          }</p>
          <p><strong>Phương thức giao hàng:</strong> ${
            dataToSendEmail.methodDelivery || "Chưa xác định"
          }</p>
          <p><strong>Người nhận:</strong> ${
            dataToSendEmail.recipientName || "Chưa xác định"
          }</p>
          <p><strong>Địa chỉ:</strong> ${
            dataToSendEmail.address || "Chưa xác định"
          }</p>
          <p><strong>Số điện thoại:</strong> ${
            dataToSendEmail.phone || "Chưa xác định"
          }</p>
          <p>Chúng tôi sẽ gửi thông tin giao hàng đến bạn trong thời gian sớm nhất.</p>
          <p>Nếu bạn có bất kỳ câu hỏi nào, hãy liên hệ với chúng tôi qua email này.</p>
          <p>Trân trọng,<br>Đội ngũ hỗ trợ khách hàng<br>Công ty của bạn</p>
        </div>
      `;

      // Gửi email
      const info = await transporter.sendMail({
        from: "huynhhoanghuy221122@gmail.com", // Địa chỉ email người gửi
        to: email ? email : "huysieuzip@gmail.com", // Địa chỉ email của khách hàng
        subject: "Cảm ơn bạn đã đặt hàng!", // Chủ đề email
        text: `Cảm ơn bạn, ${
          dataToSendEmail.recipientName || ""
        }, đã đặt hàng!`, // Nội dung văn bản
        html: `
        <div style="font-family: Arial, sans-serif;">
          <h1>Cảm ơn bạn đã đặt hàng!</h1>
          <h3>Chi tiết sản phẩm:</h3>
          <ul>
            ${productDetails}
          </ul>
          <p><strong>Tổng giá:</strong> ${
            dataToSendEmail.totalPrice || 0
          } VND</p>
          <p><strong>Phương thức thanh toán:</strong> ${
            dataToSendEmail.methodPayment || "Chưa xác định"
          }</p>
          <p><strong>Phương thức giao hàng:</strong> ${
            dataToSendEmail.methodDelivery || "Chưa xác định"
          }</p>
          <p><strong>Người nhận:</strong> ${
            dataToSendEmail.recipientName || "Chưa xác định"
          }</p>
          <p><strong>Địa chỉ:</strong> ${
            dataToSendEmail.address || "Chưa xác định"
          }</p>
          <p><strong>Số điện thoại:</strong> ${
            dataToSendEmail.phone || "Chưa xác định"
          }</p>
          <p>Chúng tôi sẽ gửi thông tin giao hàng đến bạn trong thời gian sớm nhất.</p>
          <p>Nếu bạn có bất kỳ câu hỏi nào, hãy liên hệ với chúng tôi qua email này.</p>
          <p>Trân trọng,<br>Đội ngũ hỗ trợ khách hàng<br>Công ty của bạn</p>
        </div>
      `, // Nội dung HTML
      });

      return {
        EM: "Send email success",
        EC: 0,
        DT: info,
      };
    } catch (error) {
      console.log("Error sending email:", error);
      return {
        EM: "Something went wrong in service",
        EC: 2,
      };
    }
  }
}

module.exports = new authService();
