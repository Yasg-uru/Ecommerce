import mongoose, { Schema, model } from "mongoose";
const paymentSchema=new Schema({
    razorpay_order_id:{
        type:String,
        require:[true,"please enter the razorpay order id "]
    },
    razorpay_payment_id:{
        type:String,
        require:[true,"please enter payment id"]
    },
    razorpay_signature:{
        type:String,
        require:[true,"please enter razorpay signature"]
    }
})
const paymentmodel=model("Payment",paymentSchema);
export default paymentmodel;
