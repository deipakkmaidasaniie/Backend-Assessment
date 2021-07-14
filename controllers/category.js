const Category=require('../models/category');

//create category
exports.createCategory = async (req, res) => {
    let isSuccess, status, data, message;
    try {
        const newCategory = new Category(req.body);
        const added = await newCategory.save();
        if (!added) {
            isSuccess = false;
            status = 404;
            res.status(status).json({
                isSuccess: isSuccess,
                status: status,
                message: "Error in adding Category",
            });
        }
        isSuccess = true;
        status = 201;
        data = newCategory;
        res.status(status).json({
            isSuccess: isSuccess,
            status: status,
            product: data,
            message: "Category added successfully",
        });
    } catch (err) {
        console.log(err);
        isSuccess = false;
        status = 500;
        res.status(status).json({
            isSuccess: isSuccess,
            status: status,
            message:
                "Couldn't create Category due to internal server error! Please try again later",
        });
    }
};

//fetch all the products
exports.listCategories = async (req, res) => {
    let isSuccess, data, message, status;
    try {
        let categories = await Category.find();
        if (categories.length == 0) {
            isSuccess = false;
            status = 403;
            res.status(status).json({
                isSuccess: isSuccess,
                status: status,
                message: "No categories there in store",
            });
        }
        isSuccess = true;
        data = categories;
        status = 200;
        message = "categories fetched";
        res.status(status).json({
            isSuccess: isSuccess,
            categories: data,
            status: status,
            message: message,
        });
    } catch (err) {
        console.log(err);
        isSuccess = false;
        status = 500;
        res.status(status).json({
            isSuccess: isSuccess,
            status: status,
            message:
                "Error in fetching categories due to internal server error. Please try again later",
        });
    }
};
