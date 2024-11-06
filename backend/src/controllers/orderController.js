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
    let data =
      await orderApiService.handleGetAllOrderInTransitWithUserIdPagination(
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
    let data =
      await orderApiService.handleGetAllOrderStatusWithUserIdPagination(
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
    let data = await orderApiService.handleDeleteFunc(req.query, req.body);

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

const getAllOrderPagination = async (req, res) => {
  try {
    let data = await orderApiService.handleGetAllOrderPagination(req.query);

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

const confirmOrderFunc = async (req, res) => {
  try {
    let data = await orderApiService.handleConfirmFunc(req.body);

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

const confirmOrderForShipmentFunc = async (req, res) => {
  try {
    let data = await orderApiService.handleConfirmOrderForShipmentFunc(
      req.body
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

const totalProductSold = async (req, res) => {
  try {
    let data = await orderApiService.handleTotalProductSold();

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

const totalRevenue = async (req, res) => {
  try {
    let data = await orderApiService.handleTotalRevenue();

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

const customerConfirmOrderFunc = async (req, res) => {
  try {
    let data = await orderApiService.handleCustomerConfirmFunc(req.body);

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


const customerReturnOrderFunc = async (req, res) => {
  try {
    let data = await orderApiService.handleCustomerReturnOrderFunc(req.body);

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

const totalOrderSold = async (req, res) => {
  try {
    let data = await orderApiService.handleTotalOrderSold();

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

const totalOrderReturn = async (req, res) => {
  try {
    let data = await orderApiService.handleTotalOrderReturn();

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

const getAllRevenuePagination = async (req, res) => {
  try {
    let data = await orderApiService.handleGetAllRevenuePagination(req.query);

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
  getAllOrderStatusWithUserIdPagination,
  getAllOrderPagination,
  confirmOrderFunc,
  confirmOrderForShipmentFunc,
  totalProductSold,
  totalRevenue,
  customerConfirmOrderFunc,
  customerReturnOrderFunc,
  totalOrderSold,
  totalOrderReturn,
  getAllRevenuePagination
};
