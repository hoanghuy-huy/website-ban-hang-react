import cartApiService from "../services/cartApiService";

let addProductToCart = async (req, res) => {
  try {
    let { productId, userId, quantity } = req.body;

    let data = await cartApiService.handleAddProductToCart(
      +productId,
      +userId,
      +quantity
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

let getAllFunc = async (req, res) => {
  try {
    let { userId } = req.query;

    let data = await cartApiService.handleGetAllFunc(userId);
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

let changeQuantityProduct = async (req, res) => {
  try {
    let { userId, productId, quantity } = req.body;

    let data = await cartApiService.handleChangeQuantityProduct(+userId,+productId,+quantity);
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


let deleteOneProduct = async (req, res) => {
  try {
    let { userId, productId } = req.body;

    let data = await cartApiService.handleDeleteOneProduct(+userId,+productId);

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

let deleteMultiple = async (req, res) => {
  try {
    let { itemsToDelete } = req.body;

    let data = await cartApiService.handleDeleteMultiple(itemsToDelete);

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

module.exports = { addProductToCart, getAllFunc, changeQuantityProduct, deleteOneProduct,deleteMultiple};
