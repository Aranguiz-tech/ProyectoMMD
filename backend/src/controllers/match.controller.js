"use strict";

// Importa el modelo de datos 'User'
import User from '../models/user.model.js';

// Función para obtener matches de un usuario
export const getMatches = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).populate('matches', 'username email');

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ matches: user.matches });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};

// Función para obtener todos los matches
export const getAllMatches = async (req, res) => {
    try {
        const users = await User.find().populate('matches', 'username email');
        const matchesSet = new Set();
        const matches = [];

        users.forEach(user => {
            user.matches.forEach(match => {
                const matchKey = [user._id, match._id].sort().join('-');
                if (!matchesSet.has(matchKey)) {
                    matchesSet.add(matchKey);
                    matches.push({
                        message: `${user.username} match con ${match.username}`,
                        user1: {
                            id: user._id,
                            username: user.username
                        },
                        user2: {
                            id: match._id,
                            username: match.username
                        }
                    });
                }
            });
        });

        res.status(200).json({ matches });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};
