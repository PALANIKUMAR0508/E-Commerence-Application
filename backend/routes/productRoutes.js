import express from "express";
import {
  addProducts,
  getAllProducts,
  getSingleProduct,
  updateproduct,
  deleteProduct,
  createProductReview,
  viewProductReviews,
  getAllProductByAdmin,
  adminDeleteReview,
} from "../controller/productController.js";
import { roleBasedAccess, verifyUser } from "../helper/userAuth.js";

const router = express.Router();
//app.get("/api/v1/products", getAllProducts);

/* 
router.route("/products").get(getAllProducts);
router.post("/api/v1/products", addProducts); 
router.get("/product/:id", getSingleProduct);
router.put("/product/:id", updateproduct);
router.delete("/product/:id", deleteProduct); */

// // User Access
// router.route("/products").get((req, res) => {
//   console.log("ROUTE WORKING 🔥");
//   res.send("API WORKING");
// });
// router.route("/products").get((req, res, next) => {
//   console.log("Route HIT 🔥");
//   next();
// }, getAllProducts);
//router.route("/product/:id").get(getSingleProduct)
router.route("/products").get(getAllProducts);
router.route("/product/:id").get(getSingleProduct);

//User Review
router.route("/review").put(verifyUser, createProductReview);

//Admin Access
router
  .route("/admin/product/create")
  .post(verifyUser, roleBasedAccess("admin"), addProducts); //Named import from controller
router
  .route("/admin/product/product/:id")
  .put(verifyUser, roleBasedAccess("admin"), updateproduct)
  .delete(verifyUser, roleBasedAccess("admin"), deleteProduct);

//Admin can View User Review
router
  .route("/admin/reviews")
  .get(verifyUser, roleBasedAccess("admin"), viewProductReviews);

//Admin view All Products
router
  .route("/admin/products")
  .get(verifyUser, roleBasedAccess("admin"), getAllProductByAdmin);

//Delete Review
router
  .route("/admin/reviews")
  .delete(verifyUser, roleBasedAccess("admin"), adminDeleteReview);
export default router;
