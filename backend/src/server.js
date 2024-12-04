import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import connectDB from "./config/connectDB";
import configCors from "./config/configCors";
import initApiRoutes from "./routes/index";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http"; // Import http module
import { Server } from "socket.io"; // Import socket.io

require("dotenv").config();

const app = express();
const server = http.createServer(app); // Create an HTTP server

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

// Socket.io connection
let io = new Server(server, {
  cors: { origin: "http://localhost:3001" },
  method: ["GET", "POST", "PUT"],
});



let customerSockets = {}; // Để lưu trữ kết nối của khách hàng

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Lưu kết nối của khách hàng
  socket.on("joinCustomer", (customerId) => {
    customerSockets[customerId] = socket.id;
    console.log(`Customer ${customerId} connected with socket ID ${socket.id}`);
  });

  // Lắng nghe tin nhắn từ khách hàng
  socket.on("sendMessageToAdmin", ({ customerId, message }) => {
    console.log(`Customer ${customerId}: ${message}`);
    socket.broadcast.emit("receiveMessageFromCustomer", { customerId, message });
  });

  // Lắng nghe tin nhắn từ admin
  socket.on("sendMessageToCustomer", ({ customerId, message }) => {
    const customerSocketId = customerSockets[customerId];
    if (customerSocketId) {
      io.to(customerSocketId).emit("receiveMessageFromAdmin", { message });
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    // Xóa khách hàng khi họ ngắt kết nối
    for (let customerId in customerSockets) {
      if (customerSockets[customerId] === socket.id) {
        delete customerSockets[customerId];
        break;
      }
    }
  });
});

// init api routes
initApiRoutes(app);

// Khởi động server sử dụng server.listen
server.listen(port, () => {
  console.log("Server is running on the port : " + port);
});
