import orderApiService from '../services/orderApiService'
const createFunc = async (req, res) => {
  try {
    let data = await orderApiService.createNewOrder(req.body);

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
};
