import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import userRouter from "./route/user.route.js"
import productRouter from "./route/product.route.js"
import orderRouter from "./route/order.route.js"
import venderRouter from "./route/vender.route.js"
import cartRouter from "./route/cart.route.js"
// import bodyParser from "body-parser";
const app=express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));
app.use(cookieParser());


app.use(express.json());
app.use("/user",userRouter);
app.use("/product",productRouter);
app.use("/order",orderRouter);
app.use("/vender",venderRouter);
app.use("/cart",cartRouter)

export default app;
