"use strict";

// Importa el modelo de datos 'User'
import User from '../models/user.model.js';
import Match from '../models/match.model.js';

// Función para dar "dislike" a un usuario
export const dislikeUser = async (req, res) => {
    try {
        const { userId, dislikedUserId } = req.body;

        // Verificar que los IDs sean válidos
        if (!userId || !dislikedUserId) {
            return res.status(400).json({ message: "Los IDs de usuario son requeridos" });
        }

        const user = await User.findById(userId);
        const dislikedUser = await User.findById(dislikedUserId);

        // Verificar que los usuarios existan
        if (!user || !dislikedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Verificar que el usuario no tenga like al usuario disliked
        if (!user.likes.includes(dislikedUserId)) {
            return res.status(400).json({ message: "No puedes dar dislike a un usuario al que no has dado like" });
        }

        // Agregar el dislike solo si no existe
        if (!user.dislikes.includes(dislikedUserId)) {
            user.dislikes.push(dislikedUserId);
            user.dislikeCounts.set(dislikedUserId.toString(), (user.dislikeCounts.get(dislikedUserId.toString()) || 0) + 1);
            await user.save();
        }

        // Eliminar el match si existe
        const match = await Match.findOne({
            $or: [
                { user1: userId, user2: dislikedUserId },
                { user1: dislikedUserId, user2: userId }
            ]
        });

        if (match) {
            await Match.deleteOne({ _id: match._id });
            user.matches.pull(dislikedUserId);
            dislikedUser.matches.pull(userId);
            await user.save();
            await dislikedUser.save();
        }

        res.status(200).json({ message: "Usuario disliked exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};
