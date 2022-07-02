import User from "../models/User.mjs"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const register = async (req, res) => {
    try {
        const oldUser = await User.findOne({ email: req.body.email })
    
        if (oldUser) {
            return res.status(400).send({ message: "User already exists" })
        }
    
        let hashedPassword = bcrypt.hashSync(req.body.password, 8)
    
        let userData = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        }
    
        const user = await User.create(userData)
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "2h" })
    
        // Save user token
        user.token = token
        return res.status(201).json(user)
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: err.message })
    }
}

const login = async(req, res) => {
    try {
        // Get user input
        const { email, password } = req.body

        // Validate user input
        if (!(email && password)) {
            return res.status(400).send({ message: "Please enter email and password" })
        }
        
        // Validate if user exist in our database
        const user = await User.findOne({ email })

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: "2h" })

            // save user token
            user.token = token

            // user
            res.status(200).json(user)
        }
        return res.status(400).send({ message: "Invalid email or password" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

export default {
    register,
    login,
}