import express from "express";
import {
  createProductController,
  deleteProductController,
  getAllProductController,
  getProductController,
  updateProductController,
  productPhotoController,
  productFilterController,
  productCountController,
  productListController,
  searchProductController,
  relatedProductController,
  productCategoryController,
  braintreeTokenController,
  braintreePaymentController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//get product
router.get("/get-product/:slug", getProductController);

//get all product
router.get("/get-all-product", getAllProductController);

//get product photo
router.get("/product-photo/:pid", productPhotoController);

//update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//delete product
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

//filter product
router.post("/product-filters", productFilterController);

//product-count -> Pagination
router.get("/product-count", productCountController);

//Display product as per page
router.get("/product-list/:page", productListController);

//search Product
router.get("/search/:keyword", searchProductController);

//similar products -> fetching based on category
router.get("/related-product/:pid/:cid", relatedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//payment rotes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

export default router;
