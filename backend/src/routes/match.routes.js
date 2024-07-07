"use strict";

// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Controladores de match */
import { getMatches, getAllMatches } from "../controllers/match.controller.js";

/** Middlewares de autorización */
import { isAuthenticated } from "../middlewares/auth.middleware.js";

// Se realiza una instancia de express
const router = Router();

// Define las rutas para los matches
router.get("/:userId", isAuthenticated, getMatches);
router.get("/", isAuthenticated, getAllMatches);

export default router;
