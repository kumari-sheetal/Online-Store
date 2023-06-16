// ------------------------------------2nd
// import express from "express";
// import http from "http";
// import { Server } from "socket.io";
// import bodyParser from "body-parser";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import morgan from "morgan";
// import connectDB from "./config/db.js";
// import authRoute from "./routes/authRoute.js";
// import cors from "cors";
// import categoryRoutes from "./routes/categoryRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import messageRoutes from "./routes/messageRoutes.js";

// dotenv.config();
// connectDB();

// const app = express();
// const server = http.createServer(app);
// export const io = new Server(server);
// const port = process.env.PORT || 8081;

// app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: false }));
// app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"));

// app.use("/api/v1/auth", authRoute);
// app.use("/api/v1/category", categoryRoutes);
// app.use("/api/v1/product", productRoutes);
// app.use("/api/v1/msg", messageRoutes);

// app.get("/", (req, res) => {
//   res.send({ message: "Welcome to the Ary-store" });
// });

// // io.on("connection", (socket) => {
// //   console.log("A user connected:", socket.id);

// //   socket.on("join", (userId) => {
// //     socket.join(userId);
// //   });

// //   socket.on("disconnect", () => {
// //     console.log("A user disconnected:", socket.id);
// //   });
// // });
// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   socket.on("join", (userId) => {
//     socket.join(userId);
//   });

//   socket.on("newMessage", (message) => {
//     console.log("New message received:", message);
//   });

//   socket.on("disconnect", () => {
//     console.log("A user disconnected:", socket.id);
//   });
// });
// server.listen(port, () => {
//   console.log(`${process.env.DEV_MODE}, Server Started ${port}`);
// });
// --------------------3
import express from "express";
import http from "http";
// import { Server } from "socket.io";
// import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
// import path from "path";
// import { fileURLToPath } from "url";

//config env
dotenv.config();

//db config
connectDB();

//es-module
// const _filename = fileURLToPath(import.meta.url);
// const _dirname = path.dirname(_filename);

//objects
const app = express();
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     exposedHeaders: ["Content-Length", "X-Example-Header"],
//     credentials: true,
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//   })
// );
// const server = http.createServer(app);
// export const io = new Server(server);
const port = process.env.PORT || 8081;

app.set("view engine", "ejs");

app.use(express.json());

app.use(morgan("dev"));

// app.use(express.static(path.join(_dirname, "./client/build")));

app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/msg", messageRoutes);

app.get("/", (req, res) => {
  res.send({ message: "Welcome to the Ary-store" });
});

// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   setTimeout(() => {
//     socket.emit("message", "This is a message from the server");
//   }, 4000);
//   socket.on("join", (userId) => {
//     socket.join(userId);
//   });

//   socket.on("disconnect", () => {
//     console.log("A user disconnected:", socket.id);
//   });
// });

app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});
