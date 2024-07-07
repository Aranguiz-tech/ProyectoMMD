"use strict";

// Importa el modelo de datos 'User'
import User from '../models/user.model.js';

// Función para dar "like" a un usuario
export const likeUser = async (req, res) => {
    try {
        const { userId, likedUserId } = req.body;

        const user = await User.findById(userId);
        const likedUser = await User.findById(likedUserId);

        if (!user || !likedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        if (!user.likes.includes(likedUserId)) {
            user.likes.push(likedUserId);

            // Verificar si hay match
            if (likedUser.likes.includes(userId)) {
                user.matches.push(likedUserId);
                likedUser.matches.push(userId);
                await likedUser.save();
            }

            await user.save();
        }

        res.status(200).json({ message: "Usuario liked exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};

// Función para dar "dislike" a un usuario
export const dislikeUser = async (req, res) => {
    try {
        const { userId, dislikedUserId } = req.body;

        const user = await User.findById(userId);
        const dislikedUser = await User.findById(dislikedUserId);

        if (!user || !dislikedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        if (!user.dislikes.includes(dislikedUserId)) {
            user.dislikes.push(dislikedUserId);
            await user.save();
        }

        // Remover match si existe
        user.matches = user.matches.filter(id => id.toString() !== dislikedUserId);
        dislikedUser.matches = dislikedUser.matches.filter(id => id.toString() !== userId);

        await user.save();
        await dislikedUser.save();

        res.status(200).json({ message: "Usuario disliked exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};
