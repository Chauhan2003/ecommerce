import express from 'express'
import { loginUser, registerUser } from '../controllers/user.js';
const router = express.Router()
import { requireSignIn, isAdmin } from '../middlewares/AuthMiddleware.js';

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

export default router;