"use strict";

// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Controlador de like */
import { likeUser, getLikes, getAllUsersWhoLiked } from "../controllers/like.controller.js";

/** Middlewares de autorización */
import { isAuthenticated } from "../middlewares/auth.middleware.js";

// Se realiza una instancia de express
const router = Router();

// Define las rutas para los likes
router.post("/like", isAuthenticated, likeUser);
router.get("/likes/:userId", isAuthenticated, getLikes);
router.get("/all-likes", isAuthenticated, getAllUsersWhoLiked);

export default router;
