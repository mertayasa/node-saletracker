import mongoose from "mongoose"

const Schema = mongoose.Schema

const productCategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true
})

const ProductCategory = mongoose.model("ProductCategory", productCategorySchema)

export default ProductCategory