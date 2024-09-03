import brandApiService from "../services/brandApiService";

let getAllFuncPagination = async (req, res) => {
  try {
    let { categoryId  } = req.query;

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

module.exports = {
  getAllFuncPagination,
};
