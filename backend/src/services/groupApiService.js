import db from "../models/index";

class groupApiService {
  async handleGetAllGroup() {
    try {
      let group = await db.Group.findAll({
        attributes: ["id", "name", "description"],
        order: [
          ['name', 'ASC'],
      ],
      });

      if (group) {
        return {
          EM: "Get All Group Successfully",
          EC: 0,
          DT: group,
        };
      }
      return {
        EM: "Not Found Group",
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

module.exports = new groupApiService();
