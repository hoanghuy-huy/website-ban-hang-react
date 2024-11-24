import voucherApiService from "../services/voucherApiService";

let getAllFunc = async (req, res) => {
  try {
    let data = await voucherApiService.handleGetAllFunc(req.query);
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
};
