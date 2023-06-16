import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrderController,
  getAllOrderController,
  orderStatusController,
  postOrderController,
  deleteAllOrderController,
  deleteOrderController,
  // createController,
  resetPassword,
  resetPassWordToken,
  resetPassWordUpdate,
} from "../controllers/authController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

//route object
const router = express.Router();

//routing
//Register || method -post
router.post("/register", registerController);

//LOGIN _POST
router.post("/login", loginController);

//Forgot Password -post
router.post("/forgot-password", forgotPasswordController);

//test route
router.get("/test", requireSignIn, isAdmin, testController);

//protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//Update Profile
router.put("/profile", requireSignIn, updateProfileController);

//post orders --cod
router.post("/order-details", requireSignIn, postOrderController);
//orders
router.get("/orders", requireSignIn, getOrderController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrderController);

//order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

//all orders delete --- admin
router.delete("/all-orders", requireSignIn, deleteAllOrderController);
// delete user side orders

router.delete("/orders/:orderId", requireSignIn, deleteOrderController);

//node -mailer--
router.post("/reset-password", resetPassword);

//node-mailer---check
router.get("/reset-password/:id/:token", resetPassWordToken);

////node-mailer---update password
router.post("/reset-password/:id/:token", resetPassWordUpdate);

export default router;
