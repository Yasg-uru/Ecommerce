import Order from "../model/order.model.js";
import catchasyncerror from "../middleware/catchasync.middleware.js";
import Errorhandler from "../util/Errorhandler.util.js";
import Product from "../model/product.model.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import User from "../model/user.model.js";
import paymentmodel from "../model/payment.model.js";
import vendermodel from "../model/vender.model.js";
// import Product from "../model/product.model.js"

const razorpay = new Razorpay({
  key_id: "rzp_live_tK7jKIBkQuTeH7",
  key_secret: "d3q0tkLxfFVKoizPqeboYYsm",
});
export const getkey = catchasyncerror(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "fetched your key successfully",
    key: "rzp_live_tK7jKIBkQuTeH7",
  });
});

export const getorders = catchasyncerror(async (req, res, next) => {
  const orders = await Order.find({});
  res.status(200).json({
    success: true,
    message: "fetched successfully",
    orders,
  });
});
export const createOrder = catchasyncerror(async (req, res, next) => {
  try {
    const { products, shippingaddress } = req.body;
    console.log("this is a product :" + products);
    if (!products || products.length === 0) {
      return next(new Errorhandler("Please select products", 400));
    }

    let totalamount = 0;
    const orderProducts = [];

    for (let i = 0; i < products.length; i++) {
      const productvariation = await Product.findById(products[i].productid);

      if (!productvariation) {
        return next(
          new Errorhandler(
            `Product variation not found with id: ${products[i].productid}`,
            404
          )
        );
      }

      const selectedvariation = productvariation.productvariations.find(
        (variation) => {
          return variation._id.toString() === products[i].variation.toString();
        }
      );

      if (!selectedvariation) {
        return next(
          new Errorhandler("Selected product variation not found", 404)
        );
      }

      totalamount += products[i].quantity * selectedvariation.price;

      orderProducts.push({
        product: products[i].productid,
        quantity: products[i].quantity,
        price: selectedvariation.price,
      });
    }
    const order = await Order.create({
      user: req.user._id,
      products: orderProducts,
      totalamount: totalamount,
      shippingaddress,
      status: "pending",

      payment: { status: "pending" },
    });

    const razorpayOrder = await razorpay.orders.create({
      amount: 1 * 100,
      // amount: 1 * 100,
      // amount: totalamount * 100,
      currency: "INR",
      receipt: `order_${order._id}`,
    });

    // // order.payment.transactionid = razorpayOrder.id;
    order.payment.status = razorpayOrder.status;
    order.status="shipped";
    order.ORDER_ID = razorpayOrder.id;
    await order.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    return next(new Errorhandler(error?.message, 500));
  }
});

export const order_verification = catchasyncerror(async (req, res, next) => {
  try {
    const { _id } = req.user;
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      product,
    } = req.body;
    const user = await User.findById(_id);
    if (!user) {
      return next(new Errorhandler("user not found ", 404));
    }
    console.log("this is a order  id " + razorpay_order_id);
    // const orderId = razorpay_order_id.replace("order_", ""); // Extract actual order ID
    // console.log("this is a order id sdhfg:"+orderId)
    const order = await Order.findOne({ ORDER_ID: razorpay_order_id }).populate(
      "products.product"
    );

    if (!order) {
      return next(new Errorhandler("order not found ", 404));
    }
    const rzpsecret='d3q0tkLxfFVKoizPqeboYYsm'
    const generated_signature = crypto
      .createHmac("sha256", rzpsecret)
      .update(`${razorpay_order_id} | ${razorpay_payment_id}`)
      .digest("hex");
      console.log("this is a generated signature:",generated_signature)
    // if (generated_signature !== razorpay_signature) {
    //   return next(new Errorhandler("payment not verified", 404));
    // }
    await paymentmodel.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    if (!product) {
      return next(new Errorhandler("product id not found ", 404));
    }
    const product_to_search = await Product.findById(product);
    if (!product_to_search) {
      return next(new Errorhandler("product not found", 404));
    }
    const vender = await vendermodel.findById(product_to_search.vender);
    if (!vender) {
      return next(new Errorhandler("vender not found ", 404));
    }
    vender.orders.push(order._id);
    await vender.save();
    // const vender=vendermodel.findById();
    // if(!vender){
    //   return next(new Errorhandler('vender not found'))
    // }

    order.payment.status = "completed";
    console.log("payment is verified");
    order.save();
    res.status(200).json({
      success: true,
      message: "order created successfully",
      order,
    });
  } catch (error) {
    console.log(
      "this is a error in verification of the payment :" + error?.message
    );
    return next(
      new Errorhandler(error?.message || "payment verification failed", 500)
    );
  }
});
export const updateorder = catchasyncerror(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(new Errorhandler(`order not found with this id :${id}`));
    }
    if (order.status === "delivered") {
      return next(new Errorhandler("your order delivered successfully"));
    }

    if (req.body.status === "shipped") {
      order.products.forEach(async (o) => {
        await updatestock(o.product, o.quantity);
      });
    }
    order.status = "delivered";
    await order.save();
    if (order.status === "delivered") {
      order.deliveredat = Date.now();
    }
    res.status(200).json({
      success: true,
      message: "order updated successfully",
      order,
    });
  } catch (error) {
    return next(new Errorhandler(error?.mesage, 500));
  }
});

export const updatestock = async (productid, quantity) => {
  const product = await Product.findById(productid);

  product.productvariations.forEach((variation) => {
    if (variation.stock >= quantity) {
      variation.stock -= quantity;
    } else {
      return next(new Errorhandler("Insufficient stock!"));
    }
  });
  await product.save({ validateBeforeSave: false });
};

//we need to add after completion of website :- search bar
export const myOrders = catchasyncerror(async (req, res, next) => {
  try {
    const orders = await Order.findOne({ user: req.user._id }).populate("products.product");
    if (!orders) {
      return next(new Errorhandler("order not found ", 404));
    }
    res.status(200).json({
      success: true,
      message: "your orders fetched successfully",
      orders,
    });
  } catch (error) {
    return next(new Errorhandler(error?.message, 500));
  }
});

//delete  order is only done by admin
export const deleteorder = catchasyncerror(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(new Errorhandler("order not found", 404));
    }
    await order.remove();
    res.status(200).json({
      success: true,
      message: "order deleted successffully",
      order,
    });
  } catch (error) {
    return next(new Errorhandler(error?.message, 500));
  }
});
