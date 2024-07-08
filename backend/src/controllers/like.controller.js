"use strict";

// Importa el modelo de datos 'User'
import User from '../models/user.model.js';
import Match from '../models/match.model.js';

// Función para dar "like" a un usuario
export const likeUser = async (req, res) => {
    try {
        const { userId, likedUserId } = req.body;

        // Verificar que los IDs sean válidos
        if (!userId || !likedUserId) {
            return res.status(400).json({ message: "Los IDs de usuario son requeridos" });
        }

        const user = await User.findById(userId);
        const likedUser = await User.findById(likedUserId);

        // Verificar que los usuarios existan
        if (!user || !likedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Verificar si el usuario ya ha dado dislike dos veces
        const dislikeCount = user.dislikeCounts.get(likedUserId.toString()) || 0;
        if (dislikeCount >= 2) {
            return res.status(400).json({ message: "No puedes dar like a un usuario al que has dado dislike dos veces" });
        }

        // Agregar el like solo si no existe
        if (!user.likes.includes(likedUserId)) {
            user.likes.push(likedUserId);
            await user.save();
        }

        // Si el usuario liked ya dio like al usuario actual, crear un match
        if (likedUser.likes.includes(userId)) {
            const existingMatch = await Match.findOne({
                $or: [
                    { user1: userId, user2: likedUserId },
                    { user1: likedUserId, user2: userId }
                ]
            });

            if (!existingMatch) {
                const newMatch = new Match({ user1: userId, user2: likedUserId });
                await newMatch.save();
                user.matches.push(likedUserId);
                likedUser.matches.push(userId);
                await user.save();
                await likedUser.save();
            }
        }

        res.status(200).json({ message: "Usuario liked exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};
