import db from "../models/index";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import groupRoleService from "./groupRoleService";
import { createToken } from "../middleware/jwtUser";

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
          EM: "The email is already exists",
          EC: 1,
        };

      let isPhoneExist = await this.checkPhoneExist(rawData.phone);

      if (isPhoneExist)
        return {
          EM: "The phone is already exists",
          EC: 1,
        };

      if (rawData.password && rawData.password.length < 4) {
        return {
          EM: "Your password must have more than 3 letters",
          EC: 1,
        };
      }

      // hash password
      let hashPass = this.hashPassword(rawData.password);

      let defaultGroupUser = await db.Group.findOne({
        where: { name: "guest" },
      });

      // Create new user
      await db.User.create({
        email: rawData.email,
        phone: rawData.phone,
        password: hashPass,
        groupId: defaultGroupUser.id,
      });

      return {
        EM: "A user is created successfully",
        EC: 0,
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
              token,
              groupWithRoleUser: roles,
              email: user.email,
              username: user.username,
              userGroup: group.name
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
}

module.exports = new authService();
