import express from 'express'
import color from 'colors'
import dotenv from 'dotenv'
import dbConnect from './config/database.js';
import morgan from 'morgan';
import userRoutes from './routes/user.js';

dotenv.config();

// rest object:
const app = express();

// middleware:
app.use(morgan('dev'));
app.use(express.json());

// database connection:
dbConnect();

// routes:
app.use('/api/v1/user', userRoutes);

// rest api:
app.get('/', (req, res) => {
    res.send("<h1>Welcome to ecommerce app</h1>");
})

const PORT = process.env.PORT || 8080;

// server:
app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})