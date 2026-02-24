import mongoose from 'mongoose';

const commentsSchema = new mongoose.Schema({
    message : { type: String, required: true},
    authors : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    postId:{type: mongoose.Schema.Types.ObjectId, ref: 'Post', required}
}, { timestamps: true });

const Comments = mongoose.model('Comments', commentsSchema);
export default Comments;