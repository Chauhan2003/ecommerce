import express from 'express'
const router = express.Router()
import { isAdmin, isAuthenticated } from '../middlewares/AuthMiddleware.js';
import { createCategory } from '../controllers/category.js';

router.route('/createcategory').post(isAuthenticated, isAdmin, createCategory);

export default router;