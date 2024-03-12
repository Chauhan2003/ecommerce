import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const isAuthenticated = async (req, res, next) => {
    try {
        const decode = jwt.verify(req.headers.authorization, process.env.JWT_KEY);
        req.user = decode;
        next();
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message
        })
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user.role !== 1) {
            return res.status(401).json({ message: "Unauthorized Access" })
        }
        else {
            next();
        }
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message
        })
    }
}