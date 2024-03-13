import express from 'express'
import { forgetPassword, loginUser, registerUser, resetPassword } from '../controllers/user.js';
const router = express.Router()
import { isAdmin, isAuthenticated } from '../middlewares/AuthMiddleware.js';

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

// protected user route:
router.route('/isauthenticated').get(isAuthenticated, (req, res, next) => {
    res.status(200).json({
        success: true
    })
})

// protected user route:
router.route('/isadminuser').get(isAuthenticated, isAdmin, (req, res, next) => {
    res.status(200).json({
        success: true
    })
})

// reset password:
router.route('/forgetpassword').post(forgetPassword);
router.route('/resetpassword/:id/:token').put(resetPassword);

export default router;