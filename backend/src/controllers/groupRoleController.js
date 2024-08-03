import db from "../models/index";
import groupRoleService from "../services/groupRoleService";

class roleController {
  async createFunc(req, res) {
    try {
      let data = await groupRoleService.createGroupRole(req.body);

      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        EM: "Error form server",
        EC: -1,
        DT: "",
      });
    }
  }

}

module.exports = new roleController();
