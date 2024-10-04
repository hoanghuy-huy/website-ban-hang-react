import commentApiService from "../services/commentApiService";

const getAllFunc = async (req, res) => {
  try {
    let data = await commentApiService.handleGetAllFunc(req.query);

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
};

const createFunc = async (req, res) => {
  try {
    let data = await commentApiService.handleCreateFunc(req.body);

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
};

module.exports = {
  getAllFunc,
  createFunc,
};
