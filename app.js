const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const productRouter=require('./routers/product');
const categoryRouter=require('./routers/category');

app.use('/api',productRouter);
app.use('/api',categoryRouter);

mongoose
    .connect("mongodb://localhost:27017/eshop", {
        useFindAndModify: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("database connected");
    })
    .catch((err) => {
        console.log(err);
    });
require("dotenv/config");
const port = process.env.port;

app.use(morgan("tiny"));

app.listen(port, () => {
    console.log(`listening to ${port}`);
});
