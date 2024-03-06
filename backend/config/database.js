import mongoose from "mongoose";
const connectdatabase=async ()=>{
    try {
        // const response=await mongoose.connect("mongodb://127.0.0.1:27017/Ecom",{
        const response=await mongoose.connect("mongodb://127.0.0.1:27017/Ecom",{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`database is connected with : ${response.connection.host}`)
        
    } catch (error) {
        console.log(`error is occured in connection with database : ${error}`)
    }
    
}
export default connectdatabase;
