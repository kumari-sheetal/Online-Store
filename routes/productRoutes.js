import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  apiController,
  braintreePaymentController,
  braintreeTokenController,
  deleteProductController,
  getproductadminController,
  getproductCharts,
  getproductController,
  getSingleProductController,
  productCategoryController,
  productController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
//route object
const router = express.Router();

//routes
//create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  productController
);

//get products
router.get("/get-product", getproductController);
//get products ---------admin-----------
router.get("/get-product-admin", getproductadminController);

//get -all -products --------------admindashboard(charts)

router.get("/get-products", getproductCharts);

//get-single-product
router.get("/get-product/:slug", getSingleProductController);

//get-photo
router.get("/product-photo/:pid", productPhotoController);

//update-product

router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);
//delete products
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFilterController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar products
router.get("/related-product/:pid/:cid", relatedProductController);
//category wise product
router.get("/product-category/:slug", productCategoryController);

//payment routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, braintreePaymentController);
const messages = [];
//api
router.post("/messages", apiController);

//
// Get all messages
router.get("/message", (req, res) => {
  res.json(messages);
});
export default router;
