"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Controlador de usuarios */
import { getUser, getUsers, updateUser, deleteUser } from "../controllers/user.controller.js";

/** Middlewares de autorización */
import { isAuthenticated, isAdmin } from "../middlewares/auth.middleware.js";

// Se realiza una instancia de express
const router = Router();

// Define las rutas para los usuarios
router.get("/", isAuthenticated, isAdmin, getUsers);
router.get("/:rut", isAuthenticated, isAdmin, getUser);
router.put("/:rut", isAuthenticated, isAdmin, updateUser);
router.delete("/:rut", isAuthenticated, isAdmin, deleteUser);

export default router;
