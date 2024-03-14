import express from 'express'
const router = express.Router()
import { isAdmin, isAuthenticated } from '../middlewares/AuthMiddleware.js';
import { createCategory, deleteCategory, getAllCategory, getSingleCategory, updateCategory } from '../controllers/category.js';

router.route('/create').post(isAuthenticated, isAdmin, createCategory);
router.route('/update/:id').put(isAuthenticated, isAdmin, updateCategory);
router.route('/').get(getAllCategory);
router.route('/:slug').get(getSingleCategory);
router.route('/delete/:id').delete(isAuthenticated, isAdmin, deleteCategory);

export default router;