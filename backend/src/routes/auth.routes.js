"use strict";

import { Router } from "express";
import { login, register, registerAdmin, profile, logout } from "../controllers/auth.controller.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", login);
router.post("/register", isAuthenticated, isAdmin, register);
router.post("/register-admin", isAuthenticated, isAdmin, registerAdmin);
router.get("/profile", isAuthenticated, profile);
router.post("/logout", logout);

export default router;
