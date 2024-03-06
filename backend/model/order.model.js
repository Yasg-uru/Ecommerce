import mongoose, { model, Schema } from "mongoose";
const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    vender:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Vender"
    }
    ,
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          require: [true, "please enter the quantity of the product"],
          min: 1,
        },
        price: {
          type: Number,
          require: true,
          default: 0,
        },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "shipped", "confirmed", "delivered", "cancelled"],
      default: "pending",
    },
    ORDER_ID: {
      type: String,
      
    },
   
    totalamount: {
      type: Number,
      require: true,
      default: 0,
    },
    shippingaddress: {
      street: String,
      city: String,
      state: String,
      country: String,
      country: String,
      zipCode: String,
    },
    payment: {
      

      status: {
        type: String,
       
        default: "pending",
      },
    },
    deliveredat: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
const ordermodel = model("Order", orderSchema);
export default ordermodel;
