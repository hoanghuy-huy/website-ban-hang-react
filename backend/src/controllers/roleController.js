import db from "../models/index";
import roleApiService from "../services/roleApiService";

class roleController {
  async createFunc(req, res) {
    try {
      let data = await roleApiService.handleCreate(req.body);

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

  async getAllFunc(req, res) {
    try {
      let data = await roleApiService.handleGetAll();

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

  async deleteFunc(req, res) {
    try {
      let data = await roleApiService.handleDelete(req.body.id);
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

  async updateFunc(req, res) {
    try {
      let data = await roleApiService.handleUpdate(req.body);

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

  async getRoleByGroup(req, res) {
    try {
      let data = await roleApiService.handleGetRoleByGroup(+req.query.idGroup);

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
