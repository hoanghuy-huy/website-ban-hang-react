import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import connectDB from "./config/connectDB";
import configCors from "./config/configCors";
import initApiRoutes from "./routes/index";
import cookieParser from "cookie-parser";
import cors from "cors";

require("dotenv").config();

const app = express();

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config cookie parser
app.use(cookieParser());

viewEngine(app);

// config cors
configCors(app);

connectDB();

// Enable CORS
app.use(cors({ origin: true }));

let port = process.env.PORT || 5000;

// init api routes
initApiRoutes(app);

app.listen(port, () => {
  console.log("Server is running on the port : " + port);
});
