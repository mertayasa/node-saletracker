import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

// Import Router
import AuthRouter from './routes/AuthRouter.mjs'
import ApiRouter from './routes/ApiRouter.mjs'
import ProductRouter from './routes/ProductRouter.mjs'

global.myvar = 100;

dotenv.config()
const app = express()
const dbURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.qf2mf.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => app.listen(process.env.PORT))
	.catch(err => console.log(err))

// Middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

// API
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:8082');
	next();
});

app.use('/api', ApiRouter)
app.use('/auth', AuthRouter)
app.use('/product', ProductRouter)

// 404 Not Found
app.use((req, res, next) => {
	res.send({
		message: 'Not Found'
	}, 404)
})




























// OLD CODE

// import * as http from 'http'
// import fs from 'fs'

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })


// import express_group from '@forkjs/group-router'

// require('express-group-routes')
// var router = express.Router()

// let server = http.createServer(function (req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/html' })
//     res.write('<h1>Hello World</h1>')
//     res.end()
// }).listen(8001)

// // console.log("Server running on port 8001")

// router.get('/asd', function (req, res) {
//     res.send('Wiki home page')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })