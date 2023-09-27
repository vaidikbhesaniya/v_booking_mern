import { Router } from "express";
import express from "express";
import { login, register } from "../controllers/auth.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;
