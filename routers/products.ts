import express from "express";
import {ProductWithoutId} from "../types";
import {imagesUpload} from "../multer";
import mongoDb from "../mongoDb";
import {ObjectId} from "mongodb";

const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
  try {
    const db = mongoDb.getDb();
    const products = await db.collection('products').find().toArray();
    res.send(products);
  } catch {
    res.sendStatus(500);
  }
});

productsRouter.get('/:id', async (req, res) => {
  try {
    const db = mongoDb.getDb();
    const product = await db.collection('products').findOne({ _id: new ObjectId(req.params.id) });

    if (!product) {
      return res.status(404).send({error: 'Product not found'});
    }

    res.send(product);
  } catch {
    res.sendStatus(500);
  }
});

productsRouter.post('/', imagesUpload.single('image') ,async (req, res) => {
  if (!req.body.title || !req.body.price) {
    return res.status(400).send({error: "Title and price must be present in the request"});
  }

  const productData: ProductWithoutId = {
    title: req.body.title,
    description: req.body.description,
    price: parseFloat(req.body.price),
    image: req.file ? req.file.filename : null
  };

  try {
    const db = mongoDb.getDb();
    const product = await db.collection('products').insertOne(productData);
    console.log(product);
    res.send({
      id: product.insertedId,
      ...productData
    });
  } catch {
   res.sendStatus(500);
  }
});

export default productsRouter;