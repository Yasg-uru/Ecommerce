import express from "express";
import { authorization, isAuthenticated } from "../middleware/auth.middleware.js";
import { createOrder, deleteorder, getkey, getorders, myOrders, order_verification, updateorder } from "../controller/order.controller.js";
const router=express.Router();
router.route("/create").post(isAuthenticated,createOrder);
router.route("/update/:id").put(isAuthenticated,updateorder);
router.route("/myorder").get(isAuthenticated,myOrders);
router.route("/delete/order/:id").delete(isAuthenticated,authorization("admin"),deleteorder)
router.route("/verification").post(isAuthenticated,order_verification);
router.route("/getkey").get(isAuthenticated,getkey);
router.route("/getorder").get(isAuthenticated, getorders)


export default router;
