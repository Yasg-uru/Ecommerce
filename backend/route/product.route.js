import express from 'express';
import { create_review, createproduct, getrpoductbyid,deleteproduct, deletereview, getallproducts, updateproduct, getproducts } from '../controller/product.controller.js';
import upload from "../middleware/multer.middleware.js"
import {isAuthenticated,authorization} from "../middleware/auth.middleware.js"
const router=express.Router();
router.route("/create").post(isAuthenticated,authorization("admin","vender"),upload.array('images[]'),createproduct); // checked
// router.route("/create").post(upload.array('images'),createproduct);
router.route("/get").get(isAuthenticated,getallproducts)
router.route("/update/:id").put(isAuthenticated,authorization("admin","vender"),upload.array("images[]"),updateproduct)
router.route("/delete/:id").delete(isAuthenticated,authorization("admin","vender"),deleteproduct);
router.route("/review").post(isAuthenticated,upload.array("images[]"),create_review);
router.route("/review/delete/:id").delete(isAuthenticated,deletereview)
router.route("/getproducts").get(isAuthenticated,authorization("admin"),getproducts)
router.route("/products/:id").get(isAuthenticated,getrpoductbyid)
export default router;
