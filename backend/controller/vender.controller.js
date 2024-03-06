import Vender from "../model/vender.model.js";
import Errorhandler from "../util/Errorhandler.util.js";
import catchasyncerror from "../middleware/catchasync.middleware.js";
import User from "../model/user.model.js";
import uploadcloudinary from "../util/cloudinary.util.js";
export const createvender = catchasyncerror(async (req, res, next) => {
  try {
    const { description, address, contact } = req.body;
    // let logoUrl;
    // const cloudinary=await uploadcloudinary(req.file.path);
    // logoUrl=cloudinary.secure_url;
    const user=await User.findById(req.user._id);
    if(!user){
      return next(new Errorhandler("user not found",404))
    }
    if(user.role==="admin"){
      return next(new Errorhandler("admin is not allowed to become vender"))
    }
    const vender = await Vender.create({
      description,
      user: req.user._id,

      // logoUrl,
      address,
      contact,
    });
    // const updateuser = await User.findByIdAndUpdate(
    //   req.user._id,
    //   {
    //     $set: { vender: vender._id },
    //   },
    //   { new: true }
    // );
    user.vender=vender._id;
    user.role="vender";
    await user.save();
    res.status(200).json({
      success: true,
      message: "your info accepted successfully",
      vender,
      
    });
  } catch (error) {
    return next(new Errorhandler(error?.message, 500));
  }
});
export const getvenderdetail = catchasyncerror(async (req, res, next) => {
  try {
    const venderuserwithvender = await User.findById(req.user._id).populate(
      "vender"
    );
    // if (!venderuserwithvender) {
    //   return next(new Errorhandler("not found", 404));
    // }
    // const vender=await Vender.findById(venderuserwithvender._id);
    // if(!vender){
    //   return next(new Errorhandler("vender not found"))
    // }
    
    res.status(200).json({
      success: true,
      message: "fetched successfully",
      venderuserwithvender,
      // vender
    });
  } catch (error) {
    return next(new Errorhandler(error?.message, 500));
  }
});
export const getvenders=catchasyncerror(async (req,res,next)=>{
  try {
    const venders=await Vender.find({}).populate("user");
    if(!venders){
      return next(new Errorhandler("vender not found",404))
    }
    res.status(200).json({
      success:true,
      message:"fetched venders successfully",
      venders
    })
  } catch (error) {
    return next(new Errorhandler(error?.message || "internal server error",500))
  }
})
export const updatevender = catchasyncerror(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate("vender");
    if (!user) {
      return next(new Errorhandler("user not found"));
    }
    await Vender.findByIdAndUpdate(user.vender, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "updated successfully",
    });
  } catch (error) {
    return next(new Errorhandler(error?.message, 500));
  }
});
export const deletevender = catchasyncerror(async (req, res, next) => {
  try {
    const { id } = req.params;
    const vender = await Vender.findById(id);
    if (!vender) {
      return next(new Errorhandler("vender not found", 404));
    }
    await Vender.findByIdAndDelete(vender._id);
    await User.findByIdAndUpdate(req.user._id, { $unset: { vender: 1 } });
    res.status(200).json({
      success: true,
      message: "vender deleted successfully",
    });
  } catch (error) {
    return next(new Errorhandler(error?.message, 500));
  }
});
export const getvendersorder=catchasyncerror(async (req,res,next)=>{
  try {
    const {id}=req.params;

    const orders=await Vender.findById(id).populate("orders");
    if(!orders){
      return next(new Errorhandler("order not found ",404));

    }
    res.status(200).json({
      success:true,
      message :"fetched orders of the vender ",
      orders
    })
  } catch (error) {
    
  }
})
export const getvenderproducts=catchasyncerror(async (req,res,next)=>{
  try {
    const {id}=req.params;
    const vender=await Vender.findById(id).populate("products");
    if(!vender){
      return next(new Errorhandler("vender not found ",404))
    }
    res.status(200).json({
      success:true,
      message:"fetched your products",
      vender
    })
  } catch (error) {
    return next(new Errorhandler(error?.message || "internal server error",500))
  }
})
export const approve = catchasyncerror(async (req, res, next) => {
  try {
    const { id } = req.params;
    const vender = await Vender.findById(id);
    if (!vender) {
      return next(new Errorhandler("vender not found", 404));
    }
    vender.status = "approved";
    await vender.save();
    res.status(200).json({
      success: true,
      message: "approved successfully",
      vender,
    });
  } catch (error) {
    return next(new Errorhandler(error?.message, 500));
  }
});
export const reject = catchasyncerror(async (req, res, next) => {
  try {
    const { id } = req.params;
    const vender = await Vender.findById(id);
    if (!vender) {
      return next(new Errorhandler("vender not found", 404));
    }
    vender.status = "rejected";
    await vender.save();
    res.status(200).json({
      success: true,
      message: "  rejected successfully",
      vender,
    });
  } catch (error) {
    return next(new Errorhandler(error?.message, 500));
  }
});
