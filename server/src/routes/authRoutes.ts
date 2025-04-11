import {
  authCheck,
  login,
  logout,
  register,
} from "../controllers/authController";
import { Router } from "express";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/auth-check", authCheck);

export default router;
