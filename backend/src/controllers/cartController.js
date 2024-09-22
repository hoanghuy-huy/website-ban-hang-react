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

    let data = await cartApiService.handleChangeQuantityProduct(
      +userId,
      +productId,
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

let removeOneProductFromCart = async (req, res) => {
  try {
    let { cartId } = req.body;
    console.log(cartId);

    let data = await cartApiService.handleRemoveOneProductFromCart(cartId);

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

let removeMultipleProductFromCart = async (req, res) => {
  try {
    let { itemsToDelete } = req.body;

    let data = await cartApiService.handleRemoveMultipleProductFromCart(
      itemsToDelete
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

let removeMultipleProductFromCartWithId = async (req, res) => {
  try {

    let data = await cartApiService.handleRemoveMultipleProductFromCartWithId(
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

let selectedProduct = async (req, res) => {
  try {
    let { cartId } = req.body;
    let data = await cartApiService.handleSelectedProduct(cartId);

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
  addProductToCart,
  getAllFunc,
  changeQuantityProduct,
  removeOneProductFromCart,
  removeMultipleProductFromCart,
  selectedProduct,
  removeMultipleProductFromCartWithId
};
