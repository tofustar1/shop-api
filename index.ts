import express from 'express';
import cors from 'cors';
import productsRouter from "./routers/products";
import mongoDb from "./mongoDb";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/products', productsRouter);

const run = async () => {
  await mongoDb.connect();

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  process.on('exit', () => {
    mongoDb.disconnect();
  })
};

run().catch(console.error);

