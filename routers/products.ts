import express from "express";
import {ProductMutation} from "../types";
import {imagesUpload} from "../multer";
import Product from "../models/Product";
import mongoose from "mongoose";

const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('category', 'title description');
    res.send(products);
  } catch {
    res.sendStatus(500);
  }
});

productsRouter.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send({error: 'Product not found'});
    }

    res.send(product);
  } catch {
    res.sendStatus(500);
  }
});

productsRouter.post('/', imagesUpload.single('image'), async (req, res) => {
  const productData: ProductMutation = {
    category: req.body.category,
    title: req.body.title,
    description: req.body.description,
    price: parseFloat(req.body.price),
    image: req.file ? req.file.filename : null
  };

  try {
    const product = new Product(productData);
    await product.save();

    res.send(product);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({error: error.message});
    }
    res.sendStatus(500);
  }
});

export default productsRouter;