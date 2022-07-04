import Product from "../models/Product.mjs"
import ProductCategory from "../models/ProductCategory.mjs"
import log from "../config/winston.mjs"

const index = (req, res) => {
    Product.find().sort({ createdAt: -1 }).populate('categories')
        .then((products) => {
            // let modifiedProducts = products.map(product => ({
            //     ...product._doc,
            //     createdAt: product._doc.createdAt.toDateString(),
            // }))

            return res.json({
                count : products.length,
                data : products
            })
        })
        .catch(err => {
            log.error(err.message)
            return res.status(500).json({
                count : 0,
                data : []
            })
        })
}

const store = (req, res) => {
    const product = new Product(req.body)

    product.save()
        .then(() => res.status(201).json({ message: "Product created successfully" }))
        .catch(err => {
            log.error(err.message)
            res.status(500).json({ message: "Product creation failed" })
        })
}

const find = (req, res) => {
    Product.findById(req.params.id).populate('categories')
        .then(product => {
            res.json({
                data : product
            })
        })
        .catch(err => {
            log.error(err.message)
            res.status(404).json({ message: "Product not found" })
        })
}

const update = (req, res) => {
    const data = req.body

    Product.findByIdAndUpdate(req.params.id, data, { new: true })
        .then(product => res.json(product))
        .catch(err => {
            log.error(err.message)
            res.status(500).json({ message: "Product update failed" })
        })
}

const destroy = (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: "Product deleted successfully" }))
        .catch(err => {
            log.error(err.message)
            res.status(500).json({ message: "Product deletion failed" })
        })
}

export default {
    index,
    store,
    find,
    update,
    destroy,
}