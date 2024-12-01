import { Op } from "sequelize";
import db from "../models/index";
class productApiService {
  async handleGetAllProductPagination(page, limit, brandId, categoryId) {
    try {
      let offset = (page - 1) * limit;
      console.log(brandId, categoryId);
      if (!!brandId === true || !!categoryId === true) {
        const { count, rows } = await db.Product.findAndCountAll({
          where: {
            [Op.and]: [
              !!categoryId && { categoryId: categoryId },
              !!brandId && { brandId: brandId },
            ],
          },
          offset: offset,
          limit: limit,
          order: [["id", "DESC"]],
        });

        let totalPages = Math.ceil(count / limit);

        const data = {
          totalPages: totalPages,
          totalRows: count,
          products: rows,
        };

        return {
          EM: "Get All products Success",
          EC: 0,
          DT: data,
        };
      }
      const { count, rows } = await db.Product.findAndCountAll({
        offset: offset,
        limit: limit,
        order: [["id", "DESC"]],
      });

      let totalPages = Math.ceil(count / limit);

      const data = {
        totalPages: totalPages,
        totalRows: count,
        products: rows,
      };

      return {
        EM: "Get All products Success",
        EC: 0,
        DT: data,
      };
    } catch (error) {
      console.log(error);
      return {
        EM: " Something wrong in service",
        EC: 2,
      };
    }
  }

  async handleGetAllProductHotPagination(page, limit) {
    try {
      let offset = (page - 1) * limit;

      const { count, rows } = await db.Product.findAndCountAll({
        where: { hot: true },
        offset: offset,
        limit: limit,
        order: [["id", "DESC"]],
      });

      let totalPages = Math.ceil(count / limit);

      const data = {
        totalPages: totalPages,
        totalRows: count,
        products: rows,
      };

      return {
        EM: "Get All products Success",
        EC: 0,
        DT: data,
      };
    } catch (error) {
      console.log(error);
      return {
        EM: " Something wrong in service",
        EC: 2,
      };
    }
  }

  async handleGetAllProductAuthenticPagination(page, limit) {
    try {
      let offset = (page - 1) * limit;

      const { count, rows } = await db.Product.findAndCountAll({
        where: { authentic: true },
        offset: offset,
        limit: limit,
        order: [["id", "DESC"]],
      });

      let totalPages = Math.ceil(count / limit);

      const data = {
        totalPages: totalPages,
        totalRows: count,
        products: rows,
      };

      return {
        EM: "Get All products Success",
        EC: 0,
        DT: data,
      };
    } catch (error) {
      console.log(error);
      return {
        EM: " Something wrong in service",
        EC: 2,
      };
    }
  }

  async handleGetAllProductDiscountPagination(page, limit) {
    try {
      let offset = (page - 1) * limit;

      const { count, rows } = await db.Product.findAndCountAll({
        where: {
          discountRate: {
            [Op.gt]: 30,
          },
        },
        offset: offset,
        limit: limit,
        // order: [["id", "DESC"]],
      });

      let totalPages = Math.ceil(count / limit);
      const data = {
        totalPages: totalPages,
        totalRows: count,
        products: rows,
      };

      return {
        EM: "Get All products Success",
        EC: 0,
        DT: data,
      };
    } catch (error) {
      console.log(error);
      return {
        EM: " Something wrong in service",
        EC: 2,
      };
    }
  }

  async handleGetAllProduct() {
    try {
      let data = await db.Product.findAll();
      return {
        EM: "Get All products Success",
        EC: 0,
        DT: data,
      };
    } catch (error) {
      console.log(error);
      return {
        EM: " Something wrong in service",
        EC: 2,
      };
    }
  }

  async handleGetAllProductHot() {
    try {
      let data = await db.Product.findAll({
        where: { hot: true },
        limit: 15,
      });
      return {
        EM: "Get All products Success",
        EC: 0,
        DT: data,
      };
    } catch (error) {
      console.log(error);
      return {
        EM: " Something wrong in service",
        EC: 2,
      };
    }
  }

  async handleGetProductWithCategory(categoryId) {
    try {
      let data = {};

      return {
        EM: "Category not found",
        EC: 1,
        DT: "",
      };
    } catch (error) {
      console.log(error);
      return {
        EM: " Something wrong in service",
        EC: 2,
      };
    }
  }

  async handleGetProductWithCategoryId(
    categoryId,
    page,
    limit,
    sort,
    starNumber,
    price,
    brand
  ) {
    try {
      let offset = (page - 1) * limit;
      let product;
      let convertPriceToObject = price ? price.split(",") : "";
      let convertBrandToObject = brand ? brand.split(",") : "";

      if (sort) {
        product = await db.Product.findAndCountAll({
          where: {
            [Op.and]: [
              !!+starNumber && { starsNumber: { [Op.gt]: 3.9 } },
              { categoryId: +categoryId },
              convertPriceToObject &&
                +convertPriceToObject[1] !== 0 && {
                  price: {
                    [Op.between]: [
                      convertPriceToObject[0],
                      convertPriceToObject[1],
                    ],
                  },
                },
              convertBrandToObject &&
                convertBrandToObject[0] !== "" &&
                convertBrandToObject.length > 0 && {
                  brandName: { [Op.or]: [...convertBrandToObject] },
                },
            ],
          },
          offset: offset,
          limit: limit,
          order: [["price", sort]],
        });
      } else {
        console.log(+categoryId);
        product = await db.Product.findAndCountAll({
          where: {
            [Op.and]: [
              !!+starNumber && { starsNumber: { [Op.gt]: 3.9 } },
              { categoryId: +categoryId },
              convertPriceToObject &&
                +convertPriceToObject[1] !== 0 && {
                  price: {
                    [Op.between]: [
                      convertPriceToObject[0],
                      convertPriceToObject[1],
                    ],
                  },
                },
              !!convertBrandToObject &&
                convertBrandToObject[0] !== "" &&
                convertBrandToObject.length > 0 && {
                  brandName: { [Op.or]: [...convertBrandToObject] },
                },
            ],
          },
          offset: offset,
          limit: limit,
        });
      }

      const { count, rows } = product;
      let totalPages = Math.ceil(count / limit);

      const data = {
        totalPages: totalPages,
        totalRows: count,
        products: rows,
      };

      if (totalPages === 0) {
        return {
          EM: "Not found id of category or product empty",
          EC: 1,
          DT: "",
        };
      }
      return {
        EM: "ok!, get product with category id success",
        EC: 1,
        DT: data,
      };
    } catch (error) {
      console.log(error);
      return {
        EM: " Something wrong in service",
        EC: 2,
      };
    }
  }

  async handleGetOneProduct(_productId) {
    try {
      let data;

      let product = await db.Product.findOne({
        where: { id: _productId },
        include: [{ model: db.ProductImage }],
      });

      let product1 = await db.Product.findOne({
        where: { id: _productId },
        include: [{ model: db.DetailProduct }],
      });

      let { DetailProduct } = product1;
      data = {
        product,
        DetailProduct,
      };
      if (data) {
        return {
          EM: "ok",
          EC: 0,
          DT: data,
        };
      }
      return {
        EM: "Product not found",
        EC: 1,
        DT: data,
      };
    } catch (error) {
      console.log(error);
      return {
        EM: " Something wrong in service",
        EC: 2,
      };
    }
  }

  async handleGetCategoryWithProduct(productId) {
    try {
      let product = await db.Product.findOne({
        where: { id: productId },
      });

      if (product) {
        const cat = await db.Product.findAll({
          where: { categoryId: product.categoryId },
          limit: 8,
        });

        return {
          EM: "ok",
          EC: 0,
          DT: cat,
        };
      }

      return {
        EM: "Product not found",
        EC: 1,
        DT: data,
      };
    } catch (error) {
      console.log(error);
      return {
        EM: " Something wrong in service",
        EC: 2,
      };
    }
  }

  async handleDeleteFunc({ productId }) {
    try {
      if (productId) {
        let product = await db.Product.findOne({
          where: { id: productId },
        });

        if (!product) {
          return {
            EM: "delete err",
            EC: 1,
            DT: "",
          };
        }
        await product.destroy();

        return {
          EM: "ok delete success",
          EC: 0,
          DT: "",
        };
      }

      return {
        EM: "delete err",
        EC: 1,
        DT: "",
      };
    } catch (error) {
      console.log(error);
      return {
        EM: " Something wrong in service",
        EC: 2,
      };
    }
  }

  async handleCreateFunc(rawData) {
    try {
      let { price, discountRate, ...others } = rawData;
      let roundedPrice;
      let data;
      console.log(rawData);
      if (!!discountRate) {
        let discountAmount = price * (+discountRate / 100);
        let finalPrice = price - discountAmount;
        roundedPrice = Math.round(finalPrice / 1000) * 1000;

        data = await db.Product.create({
          price: roundedPrice,
          originalPrice: price,
          discountRate: +discountRate,
          ...others,
        });

        return {
          EM: "create product success",
          EC: 0,
          DT: "",
        };
      }

      data = await db.Product.create({
        price: price,
        originalPrice: price,
        ...others,
      });

      if (!data) {
        return {
          EM: "create product error",
          EC: 1,
          DT: "",
        };
      }

      return {
        EM: "create product success",
        EC: 0,
        DT: data,
      };
    } catch (error) {
      console.log(error);
      return {
        EM: " Something wrong in service",
        EC: 2,
      };
    }
  }

  async handleEditFunc(rawData) {
    try {
      console.log(rawData);
      let { price, discountRate, ...others } = rawData;
      let roundedPrice;
      let data;
      let product = await db.Product.findOne({ where: rawData.id });

      if (!product) {
        return {
          EM: "product not found",
          EC: 1,
          DT: "",
        };
      }
      if (!!discountRate) {
        if (product.price === rawData.price) {
          let discountAmount = product.originalPrice * (+discountRate / 100);
          let finalPrice = product.originalPrice - discountAmount;
          roundedPrice = Math.round(finalPrice / 1000) * 1000;
          data = await product.update({
            price: roundedPrice,
            originalPrice: product.originalPrice,
            discountRate: +discountRate,
            ...others,
          });
        } else {
          let discountAmount = rawData.price * (+discountRate / 100);
          let finalPrice = rawData.price - discountAmount;
          roundedPrice = Math.round(finalPrice / 1000) * 1000;
          data = await product.update({
            price: roundedPrice,
            originalPrice: rawData.price,
            discountRate: +discountRate,
            ...others,
          });
        }

        return {
          EM: "Edit product success",
          EC: 0,
          DT: "",
        };
      }

      data = await product.update({
        price: product.originalPrice,
        originalPrice: price,
        ...others,
      });

      if (!data) {
        return {
          EM: "create product error",
          EC: 1,
          DT: "",
        };
      }

      return {
        EM: "create product success",
        EC: 0,
        DT: data,
      };
    } catch (error) {
      console.log(error);
      return {
        EM: " Something wrong in service",
        EC: 2,
      };
    }
  }

  async handleSearchFunc({
    page,
    limit,
    keyword,
    sort,
    starNumber,
    price,
    brand,
    categoryId,
  }) {
    try {
      page = +page;
      limit = +limit;
      let offset = (page - 1) * limit;
      // let product;
      // let convertPriceToObject = price ? price.split(",") : "";
      // let convertBrandToObject = brand ? brand.split(",") : "";
      // if (sort) {
      //   product = await db.Product.findAndCountAll({
      //     where: {
      //       [Op.and]: [
      //         {
      //           name: {
      //             [Op.like]: `%${keyword}%`,
      //           },
      //         },
      //         { quantitySold: { [Op.gt]: 100 } },
      //         !!starNumber && { starsNumber: { [Op.gt]: 3.9 } },
      //         +convertPriceToObject[1] !== 0 && {
      //           price: {
      //             [Op.between]: [
      //               convertPriceToObject[0],
      //               convertPriceToObject[1],
      //             ],
      //           },
      //         },
      //         convertBrandToObject[0] !== "" &&
      //           convertBrandToObject.length > 0 && {
      //             brandName: { [Op.or]: [...convertBrandToObject] },
      //           },
      //       ],
      //     },
      //     offset: offset,
      //     limit: limit,
      //     order: [["price", sort]],
      //   });
      // } else {
      //   product = await db.Product.findAndCountAll({
      //     where: {
      //       [Op.and]: [
      //         {
      //           name: {
      //             [Op.like]: `%${keyword}%`,
      //           },
      //         },
      //         { quantitySold: { [Op.gt]: 100 } },
      //         !!starNumber && { starsNumber: { [Op.gt]: 3.9 } },
      //         +convertPriceToObject[1] !== 0 && {
      //           price: {
      //             [Op.between]: [
      //               convertPriceToObject[0],
      //               convertPriceToObject[1],
      //             ],
      //           },
      //         },
      //         convertBrandToObject[0] !== "" &&
      //           convertBrandToObject.length > 0 && {
      //             brandName: { [Op.or]: [...convertBrandToObject] },
      //           },
      //       ],
      //     },
      //     offset: offset,
      //     limit: limit,
      //   });
      // }

      const { count, rows } = await db.Product.findAndCountAll({
        where: {
          ...(categoryId ? { categoryId } : {}),
          ...(categoryId
            ? {}
            : {
                name: {
                  [Op.like]: `%${keyword}%`,
                },
              }),
        },
        offset: offset,
        limit: limit,
        order: [["id", "DESC"]],
      });

      let totalPages = Math.ceil(count / limit);

      const data = {
        totalPages: totalPages,
        totalRows: count,
        products: rows,
      };

      return {
        EM: "Get All products Success",
        EC: 0,
        DT: data,
      };
    } catch (error) {
      console.log(error);
      return {
        EM: "Something wrong in service",
        EC: 2,
      };
    }
  }

  async handleSearchKeywordFunc({ keyword, page, limit }) {
    try {
      page = +page;
      limit = +limit;
      let offset = (page - 1) * limit;

      if (!keyword || keyword === "") {
        return {
          EM: "Keyword empty",
          EC: 0,
          DT: [],
        };
      }

      const { count, rows } = await db.Keyword.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${keyword}%`,
          },
        },
        offset: offset,
        limit: limit,
        order: [["id", "DESC"]],
      });

      let totalPages = Math.ceil(count / limit);

      const data = {
        totalPages: totalPages,
        totalRows: count,
        products: rows,
      };

      return {
        EM: "Get All products Success",
        EC: 0,
        DT: data,
      };
    } catch (error) {
      console.log(error);
      return {
        EM: "Something wrong in service",
        EC: 2,
      };
    }
  }

  async handleSearchImageFunc({ idsProduct, page = 1, limit = 10 }) {
    try {
        const idsArray = idsProduct.split(",").map((id) => parseInt(id, 10));


        const offset = (page - 1) * limit;

        const products = await db.Product.findAll({
            where: {
                id: idsArray,
            },
            limit: limit, 
            offset: offset, 
        });

        const totalProducts = await db.Product.count({
            where: {
                id: idsArray,
            },
        });

        const totalPages = Math.ceil(totalProducts / limit);

        if (products.length > 0) {
            return {
                EM: "Get All products Success",
                EC: 0,
                DT: {
                    products,
                    pagination: {
                        totalProducts,
                        totalPages,
                        currentPage: page,
                        limit: limit,
                    },
                },
            };
        } else {
            return {
                EM: "No products found",
                EC: 1,
                DT: [],
            };
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        return {
            EM: "Something went wrong in service",
            EC: 2,
        };
    }
}
}

module.exports = new productApiService();
