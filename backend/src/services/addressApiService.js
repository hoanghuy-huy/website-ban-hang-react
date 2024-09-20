import { Op, where } from "sequelize";
import db from "../models/index";

let createNewAddress = (rawData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!rawData) {
        resolve({
          EM: "Missing Value",
          DT: "",
          EC: 1,
        });
      }
      let { phone, defaultAddress,typeAddress, ...others } = rawData;
      typeAddress = typeAddress ? typeAddress : "home";

      let allAddress = await db.Address.findAll();

      if (allAddress && defaultAddress) {
        allAddress.map(async (item) => {
          await item.update({
            defaultAddress: false,
          });
        });
      }

      let data = await db.Address.create({
        typeAddress,
        phone,
        defaultAddress,
        ...others,
      });

      resolve({
        EM: "ok! create address successfully",
        DT: data,
        EC: 0,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let handleDeleteFunc = ({id}) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          EM: "Missing Value",
          DT: "",
          EC: 1,
        });
      }

      let data = await db.Address.destroy({
        where: { id: id },
      });

      resolve({
        EM: "ok! delete address successfully",
        DT: data,
        EC: 0,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let editAddress = (rawData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!rawData) {
        resolve({
          EM: "Missing Value",
          DT: "",
          EC: 1,
        });
      }

      let { id, typeAddress, defaultAddress, ...others } = rawData;
      typeAddress = typeAddress ? typeAddress : "home";

      let allAddress = await db.Address.findAll({
        where: {
          id: {
              [Op.ne]: id
          }
      }
      });


      console.log(allAddress)
      if (allAddress && defaultAddress) {
        allAddress.map(async (item) => {
          await item.update({
            defaultAddress: false,
          });
        });
      }

      let address = await db.Address.findOne({
        where: id,
      });

      if (!address) {
        resolve({
          EM: "Address not found",
          DT: "",
          EC: 1,
        });
      }

      let data = await address.update({
        typeAddress,
        defaultAddress,
        ...others,
      });

      resolve({
        EM: "ok! update address successfully",
        DT: data,
        EC: 0,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let handleGetAll = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Address.findAll({
        where: { userId: userId },
        order: [["defaultAddress", "DESC"]],
      });

      resolve({
        EM: "ok get all success",
        DT: data,
        EC: 0,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let handleGetAddressDefault = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Address.findOne({
        where: {
          [Op.and]: [{ userId: userId }, { defaultAddress: 1 }],
        },
      });

      if (!data) {
        resolve({
          EM: "address is empty",
          DT: data,
          EC: 0,
        });
      }
      resolve({
        EM: "ok",
        DT: data,
        EC: 0,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

module.exports = {
  createNewAddress,
  handleGetAll,
  editAddress,
  handleGetAddressDefault,
  handleDeleteFunc,
};
