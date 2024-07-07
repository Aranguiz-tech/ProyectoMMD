import { Schema, model } from 'mongoose';

const dislikeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  dislikedUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { versionKey: false });

const Dislike = model('Dislike', dislikeSchema);
export default Dislike;
