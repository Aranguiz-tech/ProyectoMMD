"use strict";

// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Controladores de like y dislike */
import { likeUser, dislikeUser } from "../controllers/like.controller.js";

/** Middlewares de autorización */
import { isAuthenticated } from "../middlewares/auth.middleware.js";

// Se realiza una instancia de express
const router = Router();

// Define las rutas para los likes y dislikes
router.post("/like", isAuthenticated, likeUser);
router.post("/dislike", isAuthenticated, dislikeUser);

export default router;
