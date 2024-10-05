import orderApiService from "../services/orderApiService";
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

const getAllOrderWithUserIdPagination = async (req, res) => {
  try {
    let data = await orderApiService.handleGetAllOrderWithUserIdPagination(
      req.query
    );

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

const getAllOrderInTransitWithUserIdPagination = async (req, res) => {
  try {
    let data = await orderApiService.handleGetAllOrderInTransitWithUserIdPagination(
      req.query
    );

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

const getAllOrderStatusWithUserIdPagination = async (req, res) => {
  try {
    let data = await orderApiService.handleGetAllOrderStatusWithUserIdPagination(
      req.query
    );

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

const getOneOrder = async (req, res) => {
  try {
    let data = await orderApiService.handleGetOneOrder(req.params);

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

const deleteFunc = async (req, res) => {
  try {
    let data = await orderApiService.handleDeleteFunc(req.query,req.body);

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
  getAllOrderWithUserIdPagination,
  getOneOrder,
  deleteFunc,
  getAllOrderInTransitWithUserIdPagination,
  getAllOrderStatusWithUserIdPagination
};
