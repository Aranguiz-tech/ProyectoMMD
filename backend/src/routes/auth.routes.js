"use strict";

import express from "express";
import { login, register, registerAdmin, profile, logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/register-admin", registerAdmin); 
router.get("/profile", profile);
router.post("/logout", logout);

export default router;
