import mongoose from "mongoose"
import dotenv from 'dotenv'
import ProductCategory from "../models/ProductCategory.mjs"

dotenv.config({ path: '../.env' })
const dbURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.qf2mf.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err))

const seedProductCategory = [
    {
        name: "A3 Paper",
    },
    {
        name: "Sticker",
    },
    {
        name: "Banner",
    },
    {
        name: "T-Shirt",
    },
    {
        name: "Business Card",
    }
]

const seedDB = async () => {
    try {
        await ProductCategory.deleteMany({})
        await ProductCategory.insertMany(seedProductCategory)
        console.log("Database seeded")
    } catch (err) {
        console.log(err)
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})