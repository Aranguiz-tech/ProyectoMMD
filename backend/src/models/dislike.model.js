"use strict";

import mongoose from 'mongoose';

const dislikeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dislikedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    versionKey: false
});

const Dislike = mongoose.model('Dislike', dislikeSchema);

export default Dislike;
