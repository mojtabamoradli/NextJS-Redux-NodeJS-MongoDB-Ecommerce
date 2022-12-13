import mongoose from "mongoose"

const Schema = mongoose.Schema

const commentSchema = new Schema({
    date: { type: String, default: null  },
    time: { type: String, default: null  },
    commentatorEmail: { type: String, required: true },
    commentatorName: { type: String, required: true },
    comment: { type: String, required: true },
    forId: { type: String, required: true },
    forTitle: { type: String, required: true },
    approved: { type: Boolean, default: false },

}, {timestamps: true})

const Comment = mongoose.model("Comment", commentSchema)

export {Comment}