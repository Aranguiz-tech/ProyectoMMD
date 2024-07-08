"use strict";
import Match from '../models/match.model.js';
import User from '../models/user.model.js';

// Obtener todos los matches
export const getAllMatches = async (req, res) => {
    try {
        const matches = await Match.find()
            .populate('user1', 'username')
            .populate('user2', 'username');

        const formattedMatches = matches.reduce((unique, match) => {
            const isDuplicate = unique.some((m) =>
                (m.user1.id === match.user1._id.toString() && m.user2.id === match.user2._id.toString()) ||
                (m.user1.id === match.user2._id.toString() && m.user2.id === match.user1._id.toString())
            );

            if (!isDuplicate) {
                unique.push({
                    message: `${match.user1.username} y ${match.user2.username} tienen un match`,
                    user1: {
                        id: match.user1._id,
                        username: match.user1.username
                    },
                    user2: {
                        id: match.user2._id,
                        username: match.user2.username
                    }
                });
            }

            return unique;
        }, []);

        res.status(200).json({ matches: formattedMatches });
    } catch (error) {
        console.error("Error en getAllMatches: ", error);
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

// Obtener los matches de un usuario específico
export const getMatches = async (req, res) => {
    try {
        const { userId } = req.params;

        const matches = await Match.find({
            $or: [{ user1: userId }, { user2: userId }]
        })
            .populate('user1', 'username')
            .populate('user2', 'username');

        const formattedMatches = matches.reduce((unique, match) => {
            const isDuplicate = unique.some((m) =>
                (m.user1.id === match.user1._id.toString() && m.user2.id === match.user2._id.toString()) ||
                (m.user1.id === match.user2._id.toString() && m.user2.id === match.user1._id.toString())
            );

            if (!isDuplicate) {
                unique.push({
                    message: `${match.user1.username} y ${match.user2.username} tienen un match`,
                    user1: {
                        id: match.user1._id,
                        username: match.user1.username
                    },
                    user2: {
                        id: match.user2._id,
                        username: match.user2.username
                    }
                });
            }

            return unique;
        }, []);

        res.status(200).json({ matches: formattedMatches });
    } catch (error) {
        console.error("Error en getMatches: ", error);
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};
