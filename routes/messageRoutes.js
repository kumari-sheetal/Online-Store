// import express from "express";
// import {
//   messageController,
//   getMessages,
//   createMessage,
// } from "../controllers/messageController.js";
// import { io } from "../server.js";

// const router = express.Router();

// //send message
// router.post("/", messageController);
// // Retrieve messages
// router.get("/messages", getMessages);

// // Create a new message
// router.post("/new-msg", (req, res) => {
//   createMessage(io)(req, res);
// });

// export default router;
// --------------------------------------------
// import express from "express";
// import {
//   messageController,
//   getMessages,
//   createMessage,
// } from "../controllers/messageController.js";
// import { requireSignIn } from "../middlewares/authMiddleware.js";
// import { io } from "../server.js";
// const router = express.Router();

// router.post("/", requireSignIn, messageController);
// router.get("/", requireSignIn, getMessages);
// router.post("/new-msg", requireSignIn, (req, res) => {
//   createMessage(io)(req, res);
// });

// export default router;
import express from "express";
import {
  sendMessage,
  getMessages,
  getMessageById,
} from "../controllers/messageController.js";

const router = express.Router();

router.post("/messages", sendMessage);
router.get("/messages", getMessages);
router.get("/messages/:messageId", getMessageById);

export default router;
