import addressApiService from "../services/addressApiService";
const createFunc = async (req, res) => {
  try {
    let data = await addressApiService.createNewAddress(req.body);

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

const editFunc = async (req, res) => {
  try {
    let data = await addressApiService.editAddress(req.body);

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


const getAllFunc = async (req, res) => {
  try {
    let { userId } =  req.query
    let data = await addressApiService.handleGetAll(userId);

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
  createFunc,
  getAllFunc,
  editFunc
};
