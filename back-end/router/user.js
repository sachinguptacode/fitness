import express, { Router } from "express";
import { userAuth } from "../middleware/auth.js";
import { sendEmail, verifyOtp } from "../controller/sendEmail.js";
import {
  createUser,
  getAllUser,
  userDelete,
  loginUser,
  updateUser,
} from "../controller/user.js";
const router = express.Router();

router.post("/register", createUser);
router.delete("/delete-users", userDelete);
router.get("/get-all-user", getAllUser);
router.post("/user-login", loginUser);
router.put("/update-user/:id", userAuth, updateUser);
router.post("/send-email", sendEmail);
router.post("/verify/:id", verifyOtp);
export default router;
