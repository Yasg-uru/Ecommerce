import app from "./app.js";
import dotenv from "dotenv";
import connectdatabase from "./config/database.js";

dotenv.config({ path: "backend/config/config.env" });
connectdatabase();

app.listen(process.env.PORT, () => {
  console.log(`server is runnning on port :${process.env.PORT}`);
});
