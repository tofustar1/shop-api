import express from 'express';
import cors from 'cors';
import productsRouter from "./routers/products";
import mysqlDb from "./mysqlDb";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/products', productsRouter);

const run = async () => {
  await mysqlDb.init();

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

run().catch(console.error);

