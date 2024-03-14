import slugify from "slugify";
import Product from "../models/product.js";
import fs from 'fs';

export const createProduct = async (req, res, next) => {
    try {
        const { name, slug, description, quantity, category, shipping } = req.fields;
        const { photo } = req.files;

        if (!name || !description || !quantity || !category) {
            return res.status(400).json({
                message: 'Please provide essential information'
            })
        }

        if (photo && photo.size > 1000000) {
            return res.status(400).json({
                message: 'Photo should be less than 1mb'
            })
        }

        const product = new Product({
            ...req.fields, slug: slugify(name)
        })
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();

        res.status(201).json({
            message: 'Created product successfully'
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in Creating Product'
        })
    }
}

export const getAllProduct = async (req, res, next) => {
    try {
        const products = await Product.find({}).select("-photo").limit(12).sort({ createdAt: -1 });

        res.status(200).json({
            countTotal: products.length,
            products
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in finding all product'
        })
    }
}