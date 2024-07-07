/**
 * Middleware para verificar si el usuario está autenticado
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función para continuar con la siguiente función de middleware
 */
function isAuthenticated(req, res, next) {
    if (!req.session.user) {
      return res.status(401).json({ message: 'No estás autenticado' });
    }
    next();
  }
  
  /**
  * Middleware para verificar si el usuario es administrador
  * @param {Object} req - Objeto de petición
  * @param {Object} res - Objeto de respuesta
  * @param {Function} next - Función para continuar con la siguiente función de middleware
  */
  async function isAdmin(req, res, next) {
    try {
      console.log("Sesión actual:", req.session);
      
      if (!req.session.user) {
        return res.status(401).json({ message: 'No estás autenticado' });
      }
      
      const userRole = req.session.user.rolName;
      console.log("Rol del usuario:", userRole);
  
      if (userRole === 'administrador') {
        next();
        return;
      } else {
        return res.status(403).json({ message: 'No tienes permisos para acceder a este recurso' });
      }
    } catch (error) {
      console.log("Error en auth.middleware.js -> isAdmin(): ", error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
  
  export { isAuthenticated, isAdmin };
  