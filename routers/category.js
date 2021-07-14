const express=require('express');
const app=express.Router();
const categoryController = require("../controllers/category");

app.post("/create-category",categoryController.createCategory);
app.get("/list-categories",categoryController.listCategories);
module.exports=app;
