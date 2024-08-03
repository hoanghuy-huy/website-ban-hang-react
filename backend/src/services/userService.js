import bcrypt from "bcrypt";
import db from "../models/index";

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

class userService {
  hashPassword(password) {
    let hashPassword = bcrypt.hashSync(password, salt);

    return hashPassword;
  }

  async createNewUser(email, password, username) {
    try {
      let hashPass = this.hashPassword(password);

      const newUser = await db.User.create({
        username: username,
        password: hashPass,
        email: email,
      });

      console.log("Create new user success", newUser);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllUser() {
    try {
      let user = [];

      user = await db.User.findAll();

      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(id) {
    if (!id) {
      return { msg: "No Id specified..", payload: 1 };
    }

    try {
      return !!(await db.User.destroy({
        where: {
          id: id,
        },
      }));
    } catch (e) {
      console.log(e);
    }
  }

  
  
}

module.exports = new userService();
