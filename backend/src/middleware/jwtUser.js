import jwt from "jsonwebtoken";
import groupRoleService from "../services/groupRoleService";

require("dotenv").config();

const nonSecurePath = ["/", "/account"];

const createToken = (payload) => {
  try {
    let secretKey = process.env.SECRET_KEY;
    let tokenExpiresIn = process.env.JWT_EXPIRES_IN;
    let token = jwt.sign(payload, secretKey, { expiresIn: tokenExpiresIn });

    return token;
  } catch (error) {
    console.log(error);
  }
};

const verifyToken = (token) => {
  try {
    let data = null;
    let secretKey = process.env.SECRET_KEY;
    let decode = jwt.verify(token, secretKey);
    data = decode;
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getTokenFromHeader = (req) => {
  const authHeader = req.headers["authorization"];
  const [bearer, token] = authHeader.split(" ");
  return token ? token : null;
};

const checkUserLogin = (req, res, next) => {
  try {
    let cookies = req.cookies;
    let tokenFromHeader = getTokenFromHeader(req);
    if ((cookies && cookies.token) || tokenFromHeader) {
      let token = cookies && cookies.token ? cookies.token : tokenFromHeader;
      let decoded = verifyToken(token);

      if (decoded) {
        req.user = decoded;
        req.token = token;
        next();
      } else {
        res.status(401).json({
          EC: -1,
          EM: "You not authenticated, please login",
          DT: "",
        });
      }
    } else {
      res.status(401).json({
        EC: -1,
        EM: "You not authenticated, please login",
        DT: "",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const checkUserPermission = async (req, res, next) => {
  try {
    if (nonSecurePath.includes(req.path) || req.path === "/account" || req.path === "/") {
      return next();
    }
    if (req.user) {
      let email = req.user.email;
      let groupId = req.user.groupId;
      // let roles = req.user.groupWithRoleUser.Roles;
      let rawData = await groupRoleService.getGroupWithRoleUser(groupId);
      
      let roles = rawData.map((item) => {
        return {
          id: item.Roles.id,
          url: item.Roles.url,
          description: item.Roles.description
        };
      })

      

      let currentPath = req.path;

      if (!roles || roles === 0) {
        res.status(403).json({
          EC: -1,
          EM: "Sorry, you don't have permission to access this resource",
          DT: "",
        });
      }

      let canAccess = roles.some((item) => {
        return item.url === currentPath;
      });

      if (canAccess) {
        next();
      } else {
        res.status(403).json({
          EC: -1,
          EM: "Sorry, you don't have permission to access this resource",
          DT: "",
        });
      }
    } else {
      res.status(403).json({
        EC: -1,
        EM: "Sorry, you don't have permission to access this resource",
        DT: "",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createToken,
  verifyToken,
  checkUserLogin,
  checkUserPermission,
};
