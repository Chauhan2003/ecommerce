import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
        default: "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
    },
    role: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

export default mongoose.model('User', userSchema);