import db from "../models/index";
import bcrypt from "bcrypt";

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
        attributes: ["id", "email", "phone", "groupId","address", "gender", "username"],
        offset: offset,
        limit: limit,
        include: [{ model: db.Group, attributes: ["name", "description","id"] }],
        order: [
          ['id', 'DESC']
        ],
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
        address: rawData.address
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
        where:{id: id}
      })
      if(user) {
        return {
          EM: "Find User Success",
          EC: 0,
          DT: user,
        }
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
        where:{id: data.id}
      })
      console.log(data)

      if(user) {
        await user.update({
            username: data.username,
            address: data.address,
            gender: +data.gender,
            groupId: +data.groupId
        })

        return {
          EM: "Update User Success",
          EC: 0,
          DT: user,
        }
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
}

module.exports = new userApiService();
