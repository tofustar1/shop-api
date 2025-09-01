import express from "express";
import {Product, ProductWithoutId} from "../types";
import {imagesUpload} from "../multer";
import mysqlDb from "../mysqlDb";
import {ResultSetHeader} from "mysql2";

const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
  const connection = mysqlDb.getConnection();
  const result = await connection.query('SELECT * FROM products');
  const products = result[0] as Product[];

  res.send(products);
});

productsRouter.get('/:id', async (req, res) => {
  const connection = mysqlDb.getConnection();
  const result = await connection.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
  const products = result[0] as Product[];
  const product = products[0];

  if (!product) {
    return res.status(404).send({error: 'Product not found'});
  }

  res.send(product);
});

productsRouter.post('/', imagesUpload.single('image') ,async (req, res) => {
  if (!req.body.title || !req.body.price) {
    return res.status(400).send({error: "Title and price must be present in the request"});
  }

  const product: ProductWithoutId = {
    title: req.body.title,
    description: req.body.description,
    price: parseFloat(req.body.price),
    image: req.file ? req.file.filename : null,
    category_id: req.body.category_id,
  };

  try {
    const connection = mysqlDb.getConnection();
    const result = await connection.query('INSERT INTO products (title, description, price, image, category_id) ' +
      'VALUES (?, ?, ?, ?, ?)', [product.title, product.description, product.price, product.image, product.category_id]);
    const newProduct = result[0] as ResultSetHeader;

    res.send({
      id: newProduct.insertId,
      ...product,
    });
  } catch (e) {
   res.status(400).send(e);
  }
});

export default productsRouter;