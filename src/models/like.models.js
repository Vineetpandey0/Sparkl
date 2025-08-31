import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    likedBy: [{
        user: { type: Schema.Types.ObjectId, ref: "User" },
        liked: { type: Boolean, default: true }
    }]

}, {timestamps: true})

const Like = mongoose.models.Like  || mongoose.model("Like", likeSchema)
export default Like