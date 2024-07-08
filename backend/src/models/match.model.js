"use strict";
import { Schema, model } from "mongoose";

// Esquema de Match
const matchSchema = new Schema({
  user1: { type: Schema.Types.ObjectId, ref: "User", required: true },
  user2: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, {
  timestamps: true
});

// Modelo de Match
const Match = model("Match", matchSchema);

export default Match;
