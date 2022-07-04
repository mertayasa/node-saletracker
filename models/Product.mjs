import mongoose from "mongoose"

const Schema = mongoose.Schema

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    categories: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'ProductCategory',
        }
    ],
    status: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
})

const Product = mongoose.model("Product", productSchema)

export default Product