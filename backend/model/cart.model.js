import mongoose, { Schema, model } from "mongoose";
const cartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
    },
  ],
 
 
});
const cartmodel=model("Cart",cartSchema);
export default cartmodel;

