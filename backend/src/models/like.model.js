import { Schema, model } from 'mongoose';

const likeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  likedUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { versionKey: false });

const Like = model('Like', likeSchema);
export default Like;
