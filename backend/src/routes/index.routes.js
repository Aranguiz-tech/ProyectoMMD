"use strict";

// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Enrutadores de usuarios, autenticación, likes y matches */
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import likeRoutes from "./like.routes.js";
import matchRoutes from "./match.routes.js";
import dislikeRoutes from "./dislike.routes.js";

// Se realiza una instancia de express
const router = Router();

// Define las rutas para los usuarios /api/users
router.use("/user", userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
// Define las rutas para los likes /api/like
router.use("/like", likeRoutes);
// Define las rutas para los dislikes /api/dislike
router.use("/dislike", dislikeRoutes);
// Define las rutas para los matches /api/match
router.use("/match", matchRoutes);

export default router;
