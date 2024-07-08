"use strict";

import User from '../models/user.model.js';
import Dislike from '../models/dislike.model.js';
import Match from '../models/match.model.js';

// Función para dar "dislike" a un usuario
export const dislikeUser = async (req, res) => {
    try {
        const { userId, dislikedUserId } = req.body;

        if (!userId || !dislikedUserId) {
            return res.status(400).json({ message: "Los IDs de usuario son requeridos" });
        }

        const user = await User.findById(userId);
        const dislikedUser = await User.findById(dislikedUserId);

        if (!user || !dislikedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        if (!user.likes.includes(dislikedUserId)) {
            return res.status(400).json({ message: "No puedes dar dislike a un usuario al que no le has dado like" });
        }

        if (user.likes.includes(dislikedUserId)) {
            user.likes.pull(dislikedUserId);
            await user.save();
        }

        if (!user.dislikes.includes(dislikedUserId)) {
            user.dislikes.push(dislikedUserId);
            await user.save();

            const newDislike = new Dislike({ user: userId, dislikedUser: dislikedUserId });
            await newDislike.save();
        }

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

// Función para obtener los dislikes de un usuario
export const getDislikes = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).populate('dislikes', 'username email');

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ dislikes: user.dislikes });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

// Función para obtener todos los usuarios que han dado dislike
export const getAllUsersWhoDisliked = async (req, res) => {
    try {
        const users = await User.find({ dislikes: { $exists: true, $not: { $size: 0 } } }).select('username email dislikes');

        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};
