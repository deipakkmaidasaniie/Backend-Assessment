const Product = require("../models/product");

// add a new product
exports.createProduct = async (req, res) => {
    let isSuccess, status, data, message;
    try {
        const newProduct = new Product(req.body);
        const added = await newProduct.save();
        if (!added) {
            isSuccess = false;
            status = 404;
            res.status(status).json({
                isSuccess: isSuccess,
                status: status,
                message: "Error in adding product",
            });
        }
        isSuccess = true;
        status = 200;
        data = newProduct;
        res.status(status).json({
            isSuccess: isSuccess,
            status: status,
            product: data,
            message: "Product added successfully",
        });
    } catch (err) {
        isSuccess = false;
        status = 500;
        res.status(status).json({
            isSuccess: isSuccess,
            status: status,
            message:
                "Couldn't add product due to internal server error! Please try again later",
        });
    }
};

//fetch all the products
exports.listProducts = async (req, res) => {
    let isSuccess, data, message, status;
    try {
        let products = await Product.find().populate(
            "categoryId",
            "categoryName"
        );
        if (products.length == 0) {
            isSuccess = false;
            status = 403;
            res.status(status).json({
                isSuccess: isSuccess,
                status: status,
                message: "No products there in store",
            });
        }
        isSuccess = true;
        data = products;
        status = 200;
        message = "products fetched";
        res.status(status).json({
            isSuccess: isSuccess,
            products: data,
            status: status,
            message: message,
        });
    } catch (err) {
        isSuccess = false;
        status = 500;
        res.status(status).json({
            isSuccess: isSuccess,
            status: status,
            message:
                "Error in fetching products due to internal server error. Please try again later",
        });
    }
};

// fetch particular product by id
exports.findProduct = async (req, res) => {
    let isSuccess, data, message, status;
    try {
        if (!req.params.id) {
            isSuccess = false;
            status = 404;
            res.status(status).json({
                isSuccess: isSuccess,
                status: status,
                message: "Please enter the product id to fetch product",
            });
        }
        let productid = req.params.id;
        productid = +productid; // converting into number
        const product = await Product.findById(productid).populate(
            "categoryId",
            "categoryName"
        );
        if (!product) {
            isSuccess = false;
            status = 404;
            res.status(status).json({
                isSuccess: isSuccess,
                status: status,
                message:
                    "Product doesn't exists for the given product id. Please enter valid product id.",
            });
        }
        isSuccess = true;
        data = product;
        status = 200;
        message = "product fetched";
        res.status(status).json({
            isSuccess: isSuccess,
            product: data,
            status: status,
            message: message,
        });
    } catch (err) {
        isSuccess = false;
        status = 500;
        res.status(status).json({
            isSuccess: isSuccess,
            status: status,
            message:
                "Error in fetching product due to internal server error. Please try again later",
        });
    }
};

// delete a product with its product id

exports.deleteProduct = async (req, res) => {
    let isSuccess, data, message, status;
    try {
        if (!req.params.id) {
            isSuccess = false;
            status = 404;
            res.status(status).json({
                isSuccess: isSuccess,
                status: status,
                message: "Please enter the product id to delete product",
            });
        }
        let productid = req.params.id;
        productid = +productid; // converting into number
        const deletedProduct = await Product.findByIdAndDelete(productid);
        if (!deletedProduct) {
            isSuccess = false;
            status = 404;
            res.status(status).json({
                isSuccess: isSuccess,
                status: status,
                message:
                    "Product doesn't exists for the given product id. Please enter valid product id.",
            });
        }
        isSuccess = true;
        data = deletedProduct;
        status = 200;
        message = "product deleted";
        res.status(status).json({
            isSuccess: isSuccess,
            product: data,
            status: status,
            message: message,
        });
    } catch (err) {
        isSuccess = false;
        status = 500;
        res.status(status).json({
            isSuccess: isSuccess,
            status: status,
            message:
                "Error in deleting product due to internal server error. Please try again later",
        });
    }
};

//update a product
exports.updateProduct = async (req, res) => {
    let isSuccess, data, message, status;
    try {
        if (!req.params.id) {
            isSuccess = false;
            status = 404;
            res.status(status).json({
                isSuccess: isSuccess,
                status: status,
                message: "Please enter the product id to update product",
            });
        }
        let productid = req.params.id;
        productid = +productid; // converting into number
        const product = await Product.findOneAndUpdate(
            { _id: productid },
            req.body,
            {
                new: true,
            }
        );
        if (!product) {
            isSuccess = false;
            status = 404;
            res.status(status).json({
                isSuccess: isSuccess,
                status: status,
                message:
                    "Product doesn't exists for the given product id. Please enter valid product id.",
            });
        }
        isSuccess = true;
        data = product;
        status = 200;
        message = "product updated";
        res.status(status).json({
            isSuccess: isSuccess,
            product: data,
            status: status,
            message: message,
        });
    } catch (err) {
        isSuccess = false;
        status = 500;
        res.status(status).json({
            isSuccess: isSuccess,
            status: status,
            message:
                "Error in updating product due to internal server error. Please try again later",
        });
    }
};

// fetch all the products by category Id and also list category details

exports.fetchProductByCategory = async (req, res) => {
    let isSuccess, data, message, status;
    try {
        if (!req.params.id) {
            isSuccess = false;
            status = 404;
            res.status(status).json({
                isSuccess: isSuccess,
                status: status,
                message: "Please enter the category id to fetch products",
            });
        }
        let categoryId = req.params.id;
        categoryId = +categoryId;
        let products = await Product.aggregate([
            {
                $match: {
                    categoryId: categoryId,
                },
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "categoryData",
                },
            },
        ]);
        if (products.length == 0) {
            isSuccess = false;
            status = 404;
            res.status(status).json({
                isSuccess: isSuccess,
                status: status,
                message:
                    "Products doesn't exists for the given category id. Please enter valid category id.",
            });
        }
        isSuccess = true;
        data = products;
        status = 200;
        message = "products fetched";
        res.status(status).json({
            isSuccess: isSuccess,
            products: data,
            status: status,
            message: message,
        });
    } catch (err) {
        isSuccess = false;
        status = 500;
        res.status(status).json({
            isSuccess: isSuccess,
            status: status,
            message:
                "Error in fetching products due to internal server error. Please try again later",
        });
    }
};
