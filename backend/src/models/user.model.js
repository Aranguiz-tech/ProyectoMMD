"use strict";

// Se importa el módulo de 'mongoose'
import mongoose from "mongoose";
// Se importa bcryptjs para utilizar su método de encriptación
import bcrypt from "bcryptjs";

// Crear la colección de usuarios
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    rut: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    dislikes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    matches: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    dislikeCounts: {
      type: Map,
      of: Number,
      default: {}
    }
  },
  {
    versionKey: false,
  }
);

// Contraseña del usuario encriptada
userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Comparación entre contraseña encriptada y recibida
userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

// Modelo de datos de usuario
const User = mongoose.model("User", userSchema);

export default User;
