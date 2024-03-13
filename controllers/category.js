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
            name
        }).save();

        res.status(201).json({
            message: 'Category created successfully',
            category: {
                _id: category._id,
                name: category.name
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