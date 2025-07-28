import exp from "express";
import dbConnect from "./config/db.config.js";
import cors from "cors";
import router from "./router/user.js";
import dotenv from "dotenv";

const app = exp();
dotenv.config();
app.use(exp.json());
app.use(cors({ origin: "*" }));
app.use("/api/v1", router);
dbConnect();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
