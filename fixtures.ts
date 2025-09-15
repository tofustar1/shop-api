import mongoose from "mongoose";
import config from "./config";
import Category from "./models/Category";
import Product from "./models/Product";
import User from "./models/User";
import {randomUUID} from "node:crypto";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('categories');
    await db.dropCollection('products');
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [cpuCategory, ssdCategory] = await Category.create({
    title: 'CPUs',
    description: 'Central Processor Units',
  }, {
    title: 'SSDs',
    description: 'Solid State Drives',
  });

  await Product.create({
    category: cpuCategory._id,
    title: 'Intel Core I7 12700K',
    price: 350,
    image: 'fixtures/intel-i7.png'
  }, {
    category: ssdCategory._id,
    title: 'Samsung 990 Pro 1TB',
    price: 170,
    image: 'fixtures/ssd.webp'
  });

  await User.create({
    username: 'Admin',
    password: '1234',
    token: randomUUID()
  });

  await db.close();
};

run().catch(console.error);