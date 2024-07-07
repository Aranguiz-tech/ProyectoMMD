"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Enrutador de usuarios  */
import userRoutes from "./user.routes.js";

/** Enrutador de autenticación */
import authRoutes from "./auth.routes.js";

/** Enrutador de likes */
import likeRoutes from "./like.routes.js";

/** Enrutador de matches */
import matchRoutes from "./match.routes.js";

// Se realiza una instancia de express
const router = Router();

// Define las rutas para los usuarios /api/users
router.use("/user", userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
// Define las rutas para los likes /api/likes
router.use("/likes", likeRoutes);
// Define las rutas para los matches /api/matches
router.use("/matches", matchRoutes);

export default router;
