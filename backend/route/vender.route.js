import express from "express";
import { authorization, isAuthenticated } from "../middleware/auth.middleware.js";
import { approve, createvender, deletevender, getvenderdetail, getvenderproducts, getvenders, getvendersorder, reject, updatevender } from "../controller/vender.controller.js";
const router=express.Router();
router.route("/create").post(isAuthenticated,createvender);
router.route("/update").put(isAuthenticated,updatevender);
router.route("/deletedvender/:id").delete(isAuthenticated,deletevender);
router.route("/getdetails").get(isAuthenticated,getvenderdetail)
router.route("/getallvender").get(isAuthenticated,authorization("admin"),getvenders);
router.route("/getvenderproducts/:id").get(isAuthenticated,authorization("vender"),getvenderproducts);

router.route("/getvenderorders/:id").get(isAuthenticated,authorization("vender"),getvendersorder)
//admin routes 
router.route("/approve/:id").post(isAuthenticated,authorization("admin"),approve);
router.route("/reject/:id").post(isAuthenticated,authorization("admin"),reject);

export default router;
