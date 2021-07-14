const express=require('express');
const app=express.Router();
const productController = require("../controllers/product");

app.post("/create-product", productController.createProduct);
app.get("/products-list", productController.listProducts);
app.get("/find-product/:id",productController.findProduct);
app.delete("/delete-product/:id",productController.deleteProduct);
app.patch("/update-product/:id",productController.updateProduct);
app.get("/fetch-products/:id",productController.fetchProductByCategory);
module.exports=app;