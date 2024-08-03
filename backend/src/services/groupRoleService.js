import db from "../models/index";

class groupRoleService {
  // async getGroupWithRoleUser(groupId) {
  //   const roles = await db.Group.findOne({
  //     where: { id: groupId },
  //     attributes: ["id", "name", "description"],
  //     include: [
  //       {
  //         model: db.Role,
  //         attributes: ["id", "url", "description"],
  //         through: { attributes: [] },
  //       },
  //     ],
  //   });

  //   return roles ? roles : {};
  // }

  async createGroupRole({ groupId, groupRole }) {
    try {
      await db.Group_Role.destroy({
        where: { groupId: +groupId },
      });

      await db.Group_Role.bulkCreate(groupRole);

      return {
        EM: "Assign Roles Success",
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

  async getGroupWithRoleUser(groupId) {
    const roles = await db.Group.findAll({
      where: { id: groupId },
      attributes: ["id", "name", "description"],
      include: [
        {
          model: db.Role,
          attributes: ["id", "url", "description"],
          through: { attributes: [] },
        },
      ],
      raw: true,
      nest: true,
    });

    return roles ? roles : {};
  }
}

module.exports = new groupRoleService();
