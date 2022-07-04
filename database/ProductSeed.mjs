import mongoose from "mongoose"
import dotenv from 'dotenv'
import Product from "../models/Product.mjs"
import { faker } from '@faker-js/faker';
import ProductCategory from "../models/ProductCategory.mjs";

dotenv.config({ path: '../.env' })
const dbURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.qf2mf.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))


const seedProduct = []
for (let i = 0; i < 10; i++) {
    const productId = ProductCategory.aggregate([{ $sample: { size: 1 } }])
        .then(category => {
            return category[0]._id
        })

    seedProduct.push({
        title: `Product ${faker.word.adjective()}`,
        price: faker.random.numeric(4),
        categories: [await productId],
        status: true
    })
}

const seedDB = async () => {
    try {
        await Product.deleteMany({})
        await Product.insertMany(seedProduct)
        console.log("Database seeded")
    } catch (err) {
        console.log(err)
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})