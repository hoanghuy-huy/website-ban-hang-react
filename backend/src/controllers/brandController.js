import brandApiService from "../services/brandApiService";

let getAllFuncPagination = async (req, res) => {
  try {
    let { categoryId } = req.query;

    let data = await brandApiService.handleGetAllFuncPagination(categoryId);
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

let getAllFunc = async (req, res) => {
  try {
    let data = await brandApiService.handleGetAllFunc();
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

let createFunc = async (req, res) => {
  try {
    let data = await brandApiService.handleCreateFunc(req.body);
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

let getAllBrandPagination = async (req, res) => {
  try {
    let { page, limit } = req.query;

    let data = await brandApiService.handleGetAllBrandPagination(+page, +limit);
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

let deleteFunc = async (req, res) => {
  try {
    let data = await brandApiService.handleDeleteFunc(req.body);
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

let editFunc = async (req, res) => {
  try {
    let data = await brandApiService.handleEditFunc(req.body);
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
  getAllFuncPagination,
  deleteFunc,
  getAllFunc,
  editFunc,
  getAllBrandPagination,
  createFunc,
};
