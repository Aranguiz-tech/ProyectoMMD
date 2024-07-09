import { Router } from 'express';
import { registerAdmin, register, login, profile, logout } from '../controllers/auth.controller.js';
import { isAuthenticated, isAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

// Ruta para registrar administradores (solo accesible por administradores)
router.post('/register-admin', isAuthenticated, isAdmin, registerAdmin);

// Ruta para registrar usuarios (solo accesible por administradores)
router.post('/register', isAuthenticated, isAdmin, register);

// Ruta para iniciar sesión
router.post('/login', login);

// Ruta para obtener el perfil del usuario
router.get('/profile', isAuthenticated, profile);

// Ruta para cerrar sesión
router.post('/logout', isAuthenticated, logout);

export default router;
