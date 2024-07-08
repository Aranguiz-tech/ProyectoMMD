"use strict";

// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Controlador de dislike */
import { dislikeUser } from "../controllers/dislike.controller.js";

/** Middlewares de autorización */
import { isAuthenticated } from "../middlewares/auth.middleware.js";

// Se realiza una instancia de express
const router = Router();

// Define las rutas para los dislikes
router.post("/dislike", isAuthenticated, dislikeUser);

export default router;
