import { Op } from "sequelize";
import db from "../models/index";

let handleGetAllFunc = ({ limit, page, productId, starNumber }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!productId || !limit || !page) {
        return reject({ EM: "Invalid data", EC: 400 });
      }

      limit = +limit;

      if (!!starNumber) {
        let offset = (page - 1) * limit;

        let { count, rows } = await db.Comment.findAndCountAll({
          where: {
            [Op.and]: [{ productId: +productId }, { starNumber: starNumber }],
          },
          offset: offset,
          limit: limit,
          include: [
            {
              model: db.CommentImage,
            },
          ],
          order: [["id", "DESC"]],
        });

        let totalPages = Math.ceil(count / limit);

        let data = {
          totalPages: totalPages,
          totalItems: count,
          comments: rows,
        };

        resolve({
          EM: "Ok",
          EC: 0,
          DT: data,
        });
      }
      let offset = (page - 1) * limit;

      let { count, rows } = await db.Comment.findAndCountAll({
        where: { productId: +productId },
        offset: offset,
        limit: limit,
        include: [
          {
            model: db.CommentImage,
          },
        ],
        order: [["id", "DESC"]],
      });

      let totalPages = Math.ceil(count / limit);

      let data = {
        totalPages: totalPages,
        totalItems: count,
        comments: rows,
      };

      resolve({
        EM: "Ok",
        EC: 0,
        DT: data,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let handleCreateFunc = (rawData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Comment.create(rawData);

      if (!data) {
        reject({
          EM: "Invalid data",
          EC: 1,
          DT: "",
        });
      }
      resolve({
        EM: "Ok",
        EC: 0,
        DT: data,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let handleGetAverageRating = ({ productId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!productId) {
        reject({
          EM: "Invalid data",
          EC: 1,
          DT: "",
        });
      }

      let ratings = await db.Comment.findAll({
        where: { productId: productId },
        attributes: ["starNumber"],
      });

      if (ratings.length === 0) {
        return resolve({
          EM: "No ratings found",
          EC: 0,
          DT: 0,
        });
      }

      const totalRating = ratings.reduce(
        (sum, comment) => sum + comment.starNumber,
        0
      );
      const averageRating = totalRating / ratings.length;
      const roundedAverageRating = Math.round(averageRating);

      resolve({
        EM: "Ok",
        EC: 0,
        DT: roundedAverageRating,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
module.exports = {
  handleGetAllFunc,
  handleCreateFunc,
  handleGetAverageRating,
};
