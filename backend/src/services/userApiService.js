import db from "../models/index";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

class userApiService {
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

  async handleGetAllUser(page, limit) {
    try {
      let offset = (page - 1) * limit;

      const { count, rows } = await db.User.findAndCountAll({
        offset: offset,
        limit: limit,
        include: [
          { model: db.Group, attributes: ["name", "description", "id"] },
        ],
        order: [["id", "DESC"]],
      });

      let totalPages = Math.ceil(count / limit);

      const data = {
        totalPages: totalPages,
        totalRows: count,
        users: rows,
      };

      return {
        EM: "Get All Users Success",
        EC: 0,
        DT: data,
      };
    } catch (error) {
      console.log(error);
      return {
        EM: " Something wrong in service",
        EC: 2,
      };
    }
  }

  async handleDeleteUser(idUser) {
    try {
      let user = await db.User.findOne({
        where: { id: idUser },
      });

      if (user) {
        await db.User.destroy({
          where: { id: idUser },
        });

        return {
          EM: "Delete User Success",
          EC: 0,
          DT: "",
        };
      }

      return {
        EM: "Not Found User",
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

  async handleGetGroupUser(idGroup) {
    try {
      console.log(idGroup);
      let group = await db.User.findOne({
        where: {
          groupId: idGroup,
        },
      });

      if (group) {
        return {
          EM: "Find Group User Successfully",
          EC: 0,
          DT: "",
        };
      }
      return {
        EM: "Not Found User",
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

  async createNewUser(rawData) {
    try {
      // Check email and phone already exists
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

      // Create new user
      await db.User.create({
        email: rawData.email,
        phone: rawData.phone,
        password: hashPass,
        username: rawData.username,
        groupId: +rawData.groupId,
        gender: +rawData.gender,
        address: rawData.address,
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

  async getOneUser(id) {
    try {
      let user = await db.User.findOne({
        where: { id: id },
      });
      if (user) {
        return {
          EM: "Find User Success",
          EC: 0,
          DT: user,
        };
      }
      return {
        EM: "Not Found User",
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

  async handleUpdateUser(data) {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });

      if (user) {
        if (data.phone) {
          const existingUserWithPhone = await db.User.findOne({
            where: { phone: data.phone, id: { [Op.ne]: data.id } },
          });

          if (existingUserWithPhone) {
            return {
              EM: "Số điện thoại đã được sử dụng bởi người dùng khác.",
              EC: 1,
              DT: "",
            };
          }
        }

        if (data.email) {
          const existingUserWithEmail = await db.User.findOne({
            where: { email: data.email, id: { [Op.ne]: data.id } },
          });

          if (existingUserWithEmail) {
            return {
              EM: "Email đã được sử dụng bởi người dùng khác.",
              EC: 1,
              DT: "",
            };
          }
        }

        if (data.currentPassword) {
          let check = this.comparePassword(data.currentPassword, user.password);
          let hashPass = this.hashPassword(data.newPassword);

          if (!check) {
            return {
              EM: "Mật không trùng khớp với mật khẩu cũ.",
              EC: 1,
              DT: "",
            };
          } else {
            await user.update({
              password: hashPass,
            });

            return {
              EM: "Update pass Success",
              EC: 0,
              DT: user,
            };
          }
        }

        // Nếu không có trùng lặp, thực hiện cập nhật
        await user.update({
          username: data.username,
          fullname: data.fullname,
          phone: data.phone,
          email: data.email,
          address: data.address,
          gender: +data.gender,
          groupId: +data.groupId,
        });

        return {
          EM: "Update User Success",
          EC: 0,
          DT: user,
        };
      }
      return {
        EM: "Not Found User",
        EC: 1,
        DT: "",
      };
    } catch (error) {
      console.log(error);
      return {
        EM: "Something wrong in service",
        EC: 2,
      };
    }
  }
}

module.exports = new userApiService();
