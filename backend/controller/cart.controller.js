import Cart from "../model/cart.model.js";
import catchasyncerror from "../middleware/catchasync.middleware.js";
import Errorhandler from "../util/Errorhandler.util.js";

export const createcart = catchasyncerror(async (req, res, next) => {
  try {
   
    const { product } = req.params;
    let cart=await Cart.findOne({user:req.user._id});
    if(!cart){
      cart = await Cart.create({
        user: req.user._id,
      });
    }
    
    cart.products.push({
      product,
   
    });
    await cart.save();
    res.status(200).json({
      success: true,
      message: "products added to your cart sucessfully",
    });
  } catch (error) {
    return next(new Errorhandler(error?.message, 500));
  }
});
export const removeproductsfromcart = catchasyncerror(
  async (req, res, next) => {
    try {
      const { product } = req.params;

      const cart = await Cart.findOne({ user: req.user._id });
      if (!cart) {
        return next(new Errorhandler("cart not found", 404));
      }
      cart.products.pop(product);
      await cart.save();

      res.status(200).json({
        success: true,
        message: "product removed successfully",
        cart,
      });
    } catch (error) {
      return next(new Errorhandler(error?.message, 500));
    }
  }
);
export const getcart = catchasyncerror(async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "products.product"
    );
    if (!cart) {
      return next(new Errorhandler("your cart is empty ", 404));
    }
    res.status(200).json({
      success: true,
      message: "fetched your cart successfully",
      cart,
    });
  } catch (error) {
    return next(new Errorhandler(error.message, 500));
  }
});
export const clearcart = catchasyncerror(async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return next(new Errorhandler("already your cart is empty"));
    }
   await cart.deleteOne({_id:cart._id})
    res.status(200).json({
      success: true,
      message: "your cart cleared",
      cart,
    });
  } catch (error) {
    return next(new Errorhandler(error?.message, 500));
  }
});
export const updateproductquantity = catchasyncerror(async (req, res, next) => {
  try {
    const { productid } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return next(new Errorhandler("cart is empty", 404));
    }
    const existingproduct = cart.products.find((pr) => {
      return pr.product.equals(productid);
    });
    if (existingproduct) {
      existingproduct.quantity = quantity;
    } else {
      cart.products.push({ productid, quantity });
    }

    await cart.save();
    res.status(200).json({
      success: true,
      message: "product updated successfully",
      cart,
    });
  } catch (error) {
    return next(new Errorhandler(error?.message, 500));
  }
});
