import express from "express";
import {
  clearcart,
  createcart,
  getcart,
  removeproductsfromcart,
  updateproductquantity,
} from "../controller/cart.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
const router = express.Router();
router.route("/create/:product").post(isAuthenticated, createcart);
router
  .route("/remove/:product")
  .delete(isAuthenticated, removeproductsfromcart);
router.route("/getproducts").get(isAuthenticated, getcart);
router.route("/clear").delete(isAuthenticated, clearcart);
router.route("/update/:productid").put(isAuthenticated, updateproductquantity);

export default router;
