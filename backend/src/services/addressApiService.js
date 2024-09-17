import { Op, where } from "sequelize";
import db from "../models/index";

let createNewAddress = (rawData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if(!rawData) {
        resolve({
          EM:'Missing Value',
          DT:'',
          EC:1,
        })
      }
      let {phone,typeAddress,...others}= rawData
      typeAddress = typeAddress ? typeAddress : 'home'

      let data = await db.Address.create({
        typeAddress,phone,...others
      }) 

      resolve({
        EM:'ok! create address successfully',
        DT: data,
        EC:0,
      })
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let editAddress = (rawData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if(!rawData) {
        resolve({
          EM:'Missing Value',
          DT:'',
          EC:1,
        })
      }
      let {id,typeAddress,...others}= rawData
      typeAddress = typeAddress ? typeAddress : 'home'
      
      let address = await db.Address.findOne({
        where: id
      })

      if(!address) {
        resolve({
          EM:'Address not found',
          DT:'',
          EC:1,
        })
      }


      let data = await address.update({
        typeAddress,...others
      }) 

      resolve({
        EM:'ok! update address successfully',
        DT: data,
        EC:0,
      })
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};


let handleGetAll = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {

      let data = await db.Address.findOne({
        where: { userId : userId}
      })

      resolve({
        EM:'ok get all success',
        DT: data,
        EC:0,
      })
  
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};


module.exports = {
  createNewAddress,
  handleGetAll,
  editAddress
};
