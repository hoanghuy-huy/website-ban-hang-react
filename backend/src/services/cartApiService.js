import { Op } from "sequelize";
import db from "../models/index";

let handleAddProductToCart = (productId, userId, quantity) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {};
      if (!productId || !userId || !quantity) {
        resolve({
          EM: "Missing Value",
          EC: 1,
          DT: data,
        });
      } else {
        // check if product and user already exist  in cart
        const check = await db.Cart.findOne({
          where: {
            [Op.and]: [
              {
                userId,
                productId,
              },
            ],
          },
        });

        if (check) {
          const getQuantity = check.quantity;
          check.update({
            quantity: getQuantity + quantity,
          });

          resolve({
            EC: 0,
            EM: "Add product to cart success",
            DT: data,
          });
        } else {
          data = await db.Cart.create({
            productId,
            userId,
            quantity,
            selected: false,
          });
          resolve({
            EC: 0,
            EM: "Add product to cart success",
            DT: data,
          });
        }
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let handleGetAllFunc = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {};
      if (userId) {
        data = await db.Cart.findAll({
          where: { userId },
          attributes:["id", "productId","userId", "quantity", "selected"],
          include: [
            {
              model: db.Product,
            },
          ],
        });

        resolve({
          EC: 0,
          EM: "Get All success",
          DT: data,
        });
      }

      resolve({
        EC: 1,
        EM: "User dose not exist",
        DT: {}
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let handleChangeQuantityProduct = (userId, productId, quantity) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {};
      if (userId) {
        data = await db.Cart.findOne({
          where: {
            [Op.and]: [
              {
                userId,
                productId,
              },
            ],
          },
        });
        await data.update({
          quantity: quantity,
        });
        resolve({
          EC: 0,
          EM: "ok",
          DT: data,
        });
      }

      resolve({
        EC: 1,
        EM: "User dose not exist",
        data: {},
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const handleRemoveOneProductFromCart = (cartId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (cartId) {
        const cartItem = await db.Cart.findOne({
          where: {id: cartId} 
        });
        if (cartItem) {
          await cartItem.destroy();

          return resolve({
            EM: "ok",
            EC: 0,
            DT: "",
          });
        }

        return resolve({
          EM: "Cart Id Not Found",
          EC: 1,
          DT: "",
        });
      }

      return resolve({
        EM: "Delete error",
        EC: 1,
        DT: "",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const handleRemoveMultipleProductFromCart = (itemsToDelete) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (itemsToDelete && itemsToDelete.length > 0) {
        for (let item of itemsToDelete) {
          let { id } = item;
          if (id) {
            const cartItem = await db.Cart.findOne({
              where: {id : id}
            });
            if (cartItem) {
              await cartItem.destroy();
            }
          }
        }
        return resolve({
          EM: "ok",
          EC: 0,
          DT: "",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleRemoveMultipleProductFromCartWithId = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.Cart.destroy({
        where: {
          id: {
            [Op.in]: data
          }
        }
      });

      if(!result) {
        resolve({
          EM:'Something wrong with service',
          EC: 1,
          DT: '',
        })
      }
      
      resolve({
        EM:'ok delete success',
        EC: 0,
        DT: result,
      })
    } catch (error) {
      reject(error);
    }
  });
};

const handleSelectedProduct = (cartId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (cartId) {
        let cart = await db.Cart.findOne({
          where: {id: cartId}
        })
        
        await cart.update({
          selected: !cart.selected
        })

        return resolve({
          EC: 0,
          EM: "ok",
          DT: cart,
        });

      }

      return resolve({
        EC: 1,
        EM: "Invalid value",
        DT: [],
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleAddProductToCart,
  handleGetAllFunc,
  handleChangeQuantityProduct,
  handleRemoveOneProductFromCart,
  handleRemoveMultipleProductFromCart,
  handleSelectedProduct,
  handleRemoveMultipleProductFromCartWithId
};
