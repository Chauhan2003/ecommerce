import User from '../models/user.js'
import { comparePassword, hashPassword } from '../utils/user.js'
import jwt from 'jsonwebtoken'
import { sendPasswordMail } from '../utils/mail.js'

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
            message: 'Register Successfully'
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in Register'
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

        const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
            expiresIn: "15d"
        })

        res.status(201).json({
            message: 'Login Successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                address: user.address,
                phone: user.phone,
                role: user.role
            },
            token
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in Login'
        })
    }
}

export const forgetPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            });
        }
        // generate a reset password token:
        const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
            expiresIn: '10m'
        });

        await sendPasswordMail(user._id, token, email)
        res.status(200).json({
            success: true,
            message: 'Check your Email to Reset Password!'
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in Forget Password'
        })
    }
}

export const resetPassword = async (req, res, next) => {
    try {
        const { password } = req.body;
        const id = req.params.id;
        const token = req.params.token;

        try {
            jwt.verify(token, process.env.JWT_KEY);
            const hashedPassword = await hashPassword(password);
            const user = await User.findByIdAndUpdate(id, { password: hashedPassword });

            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Password Reset Successfully'
            });
        } catch (error) {
            return res.status(400).json({
                message: 'Server Error or Expired Link'
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Error in Resetting Password'
        });
    }
};
