"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from 'express';
import { getUser, getUsers, updateUser, deleteUser } from '../controllers/user.controller.js';
import { isAuthenticated, isAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

// Rutas protegidas por autenticación y rol de administrador
router.get('/', isAuthenticated, isAdmin, getUsers);
router.get('/:rut', isAuthenticated, isAdmin, getUser);
router.put('/:rut', isAuthenticated, isAdmin, updateUser);
router.delete('/:rut', isAuthenticated, isAdmin, deleteUser);

export default router;
