// Importa el modelo de datos 'User'
import User from "../models/user.model.js";

// Función para obtener todos los matches
export const getAllMatches = async (req, res) => {
  try {
    const users = await User.find({}).populate("matches", "username");

    let matches = [];

    users.forEach(user => {
      user.matches.forEach(match => {
        if (match.matches.includes(user._id) && !matches.some(m => (m.user1 === user.username && m.user2 === match.username) || (m.user1 === match.username && m.user2 === user.username))) {
          matches.push({
            user1: user.username,
            user2: match.username
          });
        }
      });
    });

    res.status(200).json({ matches });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

// Función para obtener los matches de un usuario específico
export const getMatches = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("matches", "username");

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const matches = user.matches.filter(match => match.matches.includes(user._id));

    res.status(200).json({ matches });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};
