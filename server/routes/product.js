import express from 'express';
import { isAdmin, isAuthenticated } from '../middlewares/AuthMiddleware.js';
import { createProduct, getAllProduct } from '../controllers/product.js';
const router = express.Router();
import formidable from 'express-formidable';

router.route('/create').post(isAuthenticated, isAdmin, formidable(), createProduct)
router.route('/').get(getAllProduct);

export default router;