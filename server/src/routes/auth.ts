import express from "express";
import { login, logout, register, validateToken } from "../services/auth";
import { loginValidator, signupValidator } from "../validator/authValidator";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.post("/register", signupValidator, register);
router.post("/login", loginValidator, login);
router.get("/validate-token", verifyToken, validateToken);
router.post("/logout", verifyToken, logout);

export default router;
