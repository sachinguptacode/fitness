import exp from "express";
import dbConnect from "./config/db.config.js";
import cors from "cors";
import router from "./router/user.js";
import dotenv from "dotenv";

const app = exp();
dotenv.config();
app.use(exp.json());
app.use(cors());
app.use("/api/v1", router);
dbConnect();

app.listen(3000);
