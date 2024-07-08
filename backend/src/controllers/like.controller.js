"use strict";

import User from '../models/user.model.js';
import Like from '../models/like.model.js';
import Match from '../models/match.model.js';

// Función para dar "like" a un usuario
export const likeUser = async (req, res) => {
    try {
        const { userId, likedUserId } = req.body;

        if (!userId || !likedUserId) {
            return res.status(400).json({ message: "Los IDs de usuario son requeridos" });
        }

        const user = await User.findById(userId);
        const likedUser = await User.findById(likedUserId);

        if (!user || !likedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const dislikeCount = await Like.countDocuments({ user: userId, likedUser: likedUserId });
        if (dislikeCount >= 2) {
            return res.status(400).json({ message: "No puedes dar like a un usuario al que has dado dislike dos veces" });
        }

        if (user.dislikes.includes(likedUserId)) {
            user.dislikes = user.dislikes.filter(id => id.toString() !== likedUserId.toString());
        }

        if (!user.likes.includes(likedUserId)) {
            user.likes.push(likedUserId);
            await user.save();

            const newLike = new Like({ user: userId, likedUser: likedUserId });
            await newLike.save();
        }

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

// Función para obtener los likes de un usuario
export const getLikes = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).populate('likes', 'username email');

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ likes: user.likes });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

// Función para obtener todos los usuarios que han dado like
export const getAllUsersWhoLiked = async (req, res) => {
    try {
        const users = await User.find({ likes: { $exists: true, $not: { $size: 0 } } }).select('username email likes');

        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};
