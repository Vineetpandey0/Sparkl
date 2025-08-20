import mongoose, {Schema} from "mongoose";

const postSchema = new Schema({
    postFile: {
        type: String, //cloudinary url
        required: true
    },
    caption: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

export const Post = mongoose.model("Post", postSchema)