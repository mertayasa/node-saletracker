import Product from "../models/Product.mjs";

const index = (req, res) => {
    Product.find().sort({ createdAt: -1 })
        .then((products) => {
            let modifiedProducts = products.map(product => ({
                ...product._doc,
                createdAt: product._doc.createdAt.toDateString(),
            }))

            return res.json(modifiedProducts)
        })
        .catch(err => res.send(err.message))
}

const store = (req, res) => {
    const product = new Product(req.body)

    product.save()
        .then(() => res.json({ message: "Product created successfully" }))
        .catch(err => res.send(err.message))
}

const find = (req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            res.json(product)
        })
        .catch(err => res.send(err.message))
}

const update = (req, res) => {
    const data = req.body

    Product.findByIdAndUpdate(req.params.id, data, { new: true })
        .then(product => res.json(product))
        .catch(err => res.send(err.message))
}

const destroy = (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: "Product deleted successfully" }))
        .catch(err => res.send(err.message))
}

export default {
    index,
    store,
    find,
    update,
    destroy,
}