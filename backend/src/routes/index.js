import authRouter from "./auth.js";
import userRouter  from './user.js'
import groupRouter from './group.js'
import roleRouter from './role.js'
import groupRoleRouter from './groupRole.js'
import productRouter from './product.js'
import categoryRouter from './category.js'
import cartRouter from './cart.js'
import brandRouter from './brand.js'
import addressRouter from './address.js'

function initApiRoutes(app) {
  app.use("/api/v1", authRouter);
  app.use("/api/v1", userRouter);
  app.use("/api/v1", groupRouter);
  app.use("/api/v1", roleRouter);
  app.use("/api/v1", groupRoleRouter);
  app.use("/api/v1", productRouter);
  app.use("/api/v1", categoryRouter);
  app.use("/api/v1/cart",cartRouter)
  app.use("/api/v1/brand",brandRouter)
  app.use("/api/v1/address",addressRouter)
}

module.exports = initApiRoutes;
