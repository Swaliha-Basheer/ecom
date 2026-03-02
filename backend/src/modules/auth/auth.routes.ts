import { Router } from "express";
import {
  registerUser,
  verifyOtp,
  loginUser
} from "./auth.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/verify-otp", verifyOtp);
router.post("/login", loginUser);

export default router;