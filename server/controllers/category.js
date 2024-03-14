import slugify from "slugify";
import Category from "../models/category.js";

export const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                message: 'Name is required'
            })
        }

        const existCategory = await Category.findOne({ name });

        if (existCategory) {
            return res.status(400).json({
                message: 'This category already exists'
            })
        }

        const category = await new Category({
            name,
            slug: slugify(name)
        }).save();

        res.status(201).json({
            message: 'Category created successfully',
            category: {
                _id: category._id,
                name: category.name,
                slug: category.slug
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in Creating Category'
        })
    }
}

export const updateCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const id = req.params.id;
        const category = await Category.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );

        res.status(200).json({
            message: 'Category updated Successfully!'
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in Updating Category'
        })
    }
}

export const getAllCategory = async (req, res, next) => {
    try {
        const category = await Category.find({});

        res.status(200).json({
            category
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in finding all category'
        })
    }
}

export const getSingleCategory = async (req, res, next) => {
    try {
        const slug = req.params.slug;
        const category = await Category.findOne({ slug });

        res.status(200).json({
            category
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in finding category'
        })
    }
}

export const deleteCategory = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Category.findByIdAndDelete(id);

        res.status(200).json({
            message: 'Category deleted successfully'
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in delete category'
        })
    }
}