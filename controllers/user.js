import User from '../models/user.js'
import { comparePassword, hashPassword } from '../utils/user.js'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, phone, address } = req.body;
        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: "Please provide all the required fields" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use." })
        }

        const hashedPassword = await hashPassword(password);
        const user = await new User({
            name,
            email,
            password: hashedPassword,
            phone,
            address
        }).save();

        res.status(201).json({
            message: 'Register Successfull',
            user: {
                name: user.name,
                email: user.email,
                address: user.address,
                phone: user.phone
            }
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            success: false,
            message: 'Error in Register',
            err
        })
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide all the required fields" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid Email or Password" });
        }
        const isValidPass = await comparePassword(password, user.password);
        if (!isValidPass) {
            return res.status(401).json({ message: "Invalid Email or Password" })
        }

        const token = await jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
            expiresIn: "15d"
        })

        res.status(201).json({
            message: 'Login Successfull',
            user: {
                name: user.name,
                email: user.email,
                address: user.address,
                phone: user.phone
            },
            token
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            success: false,
            message: 'Error in Login',
            err
        })
    }
}