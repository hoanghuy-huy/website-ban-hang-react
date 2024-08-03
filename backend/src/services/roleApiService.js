import db from "../models/index";

class roleApiService {
  async handleCreate(rawData) {
    try {
      const role = Object.entries(rawData).map(([key, value]) => ({
        url: value.url,
        description: value.description || "null",
      }));

      let currentRole = await db.Role.findAll({
        attributes: ["url", "description"],
        raw: true,
      });

      let result = role.filter(
        ({ url: url1 }) => !currentRole.some(({ url: url2 }) => url1 === url2)
      );

      if (result.length === 0) {
        return {
          EM: "Nothing updated...",
          EC: 0,
          DT: "",
        };
      }

      await db.Role.bulkCreate(result);

      return {
        EM: "Create successfully",
        EC: 0,
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

  async handleGetAll() {
    try {
      const data = await db.Role.findAll({
        attributes: ["id", "url", "description"],
        order: [["id", "DESC"]],
      });

      return {
        EM: "Get All Roles Success",
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

  async handleDelete(id) {
    try {
      let role = await db.Role.findOne({
        where: { id: id },
      });

      if (role) {
        await role.destroy({
          where: { id: id },
        });

        return {
          EM: "Delete Role Success",
          EC: 0,
          DT: "",
        };
      }

      return {
        EM: "Not Found Role",
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

  async handleGetRoleByGroup(idGroup) {
    try {

      const roles = await db.Group.findOne({
        where: { id: idGroup },
        attributes: ["id", "name", "description"],
        include: [
          {
            model: db.Role,
            attributes: ["id", "url", "description"],
            through: { attributes: [] },
          },
        ],
      });

      if (roles) {
        return {
          EM: "Get Roles Success",
          EC: 0,
          DT: roles,
        };
      }

      return {
        EM: "Not found roles",
        EC: 1,
        DT: roles,
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

module.exports = new roleApiService();
