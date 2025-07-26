import express, { Router } from "express";
import { createUser, getAllUser, userDelete } from "../controller/user.js";
const router = express.Router();

router.post("/register", createUser);
router.delete("/delete-users", userDelete);
router.get("/get-all-user", getAllUser);
router.patch("/update-user");
export default router;
