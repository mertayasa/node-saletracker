import mongoose from "mongoose"

const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})

const Article = mongoose.model("Article", articleSchema)

export default Article