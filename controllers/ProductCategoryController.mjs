import ProductCategory from "../models/ProductCategory.mjs"
import log from "../config/winston.mjs"

const index = (req, res) => {
    ProductCategory.find().sort({ createdAt: -1 })
        .then((productCategories) => {
            return res.json({
                count: productCategories.length,
                data: productCategories
            })
        })
        .catch(err => {
            log.error(err.message)
            return res.status(500).json({
                count: 0,
                data: []
            })
        })
}

const store = (req, res) => {
    new ProductCategory(req.body)
        .then(() => res.status(201).json({ message: "Product category created successfully" }))
        .catch(err => {
            log.error(err.message)
            res.status(500).json({ message: "Product category creation failed" })
        })
}

const find = (req, res) => {
    ProductCategory.findById(req.params.id)
        .then(productCategory => {
            res.json({
                data : productCategory
            })
        })
        .catch(err => {
            log.error(err.message)
            res.status(404).json({ message: "Product category not found" })
        })
}

const update = (req, res) => {
    const data = req.body
    ProductCategory.findByIdAndUpdate(req.params.id, data, { new: true })
        .then(productCategory => res.json(productCategory))
        .catch(err => {
            log.error(err.message)
            res.status(500).json({ message: "Product category update failed" })
        })
}

const destroy = (req, res) => {
    ProductCategory.findByIdAndRemove(req.params.id)
        .then(() => res.status(200).json({ message: "Product category deleted successfully" }))
        .catch(err => {
            log.error(err.message)
            res.status(500).json({ message: "Product category deletion failed" })
        })
}


export default {
    index,
    store,
    find,
    update,
    destroy
}