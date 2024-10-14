const express = require("express");
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: String,
  stock: Number
});

// Create a model
const Product = mongoose.model("Product", productSchema);

app.get("/",async (req,res,next)=>{
    console.log('hi');
    try {
      // Create a new product
      const newProduct = new Product({
        name: "Sample Product",
        price: 100,
        description: "This is a sample product",
        category: "Electronics",
        stock: 50
      });
  
      // Save the product to the database
      await newProduct.save();
      res.send("Product inserted successfully");
    } catch (error) {
      res.status(500).send("Error inserting product: " + error.message);
    }
    res.send("<h2>Hello "+process.env.FIRSTNAME+" "+process.env.LASTNAME+"</h2>");
});
mongoose
  .connect('mongodb://mongo:27017/online-shop')
  .then(() => {
    console.log("connected to the database");
  })
  .catch((error) => {
    console.log("error connecting to the database:", error);
  });
app.listen(3000,()=>{
  console.log("server running on port 3000");
})
