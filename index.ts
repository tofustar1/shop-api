import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import productsRouter from "./routers/products";
import categoriesRouter from "./routers/categories";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);

const run = async () => {
  await mongoose.connect('mongodb://localhost/shop');

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  })
};

run().catch(console.error);

