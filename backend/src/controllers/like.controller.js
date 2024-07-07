"use strict";

// Importa el modelo de datos 'User'
import User from '../models/user.model.js';
import Like from '../models/like.model.js';
import Dislike from '../models/dislike.model.js';

export const likeUser = async (req, res) => {
  try {
    const { userId, likedUserId } = req.body;

    const user = await User.findById(userId);
    const likedUser = await User.findById(likedUserId);

    if (!user || !likedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const existingLike = await Like.findOne({ user: userId, likedUser: likedUserId });
    if (!existingLike) {
      const newLike = new Like({ user: userId, likedUser: likedUserId });
      await newLike.save();
    }

    res.status(200).json({ message: "Usuario liked exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

export const dislikeUser = async (req, res) => {
  try {
    const { userId, dislikedUserId } = req.body;

    const user = await User.findById(userId);
    const dislikedUser = await User.findById(dislikedUserId);

    if (!user || !dislikedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const existingDislike = await Dislike.findOne({ user: userId, dislikedUser: dislikedUserId });
    if (!existingDislike) {
      const newDislike = new Dislike({ user: userId, dislikedUser: dislikedUserId });
      await newDislike.save();
    }

    res.status(200).json({ message: "Usuario disliked exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};
