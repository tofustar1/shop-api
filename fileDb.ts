import {promises as fs} from 'fs';
import {Product, ProductWithoutId} from "./types";
import {randomUUID} from "node:crypto";

const fileName = './db.json';
let data: Product[] = [];

const fileDb = {
  async init() {
    try {
      const fileContents = await fs.readFile(fileName);
      data = JSON.parse(fileContents.toString());
    } catch (e) {
      data = [];
    }
  },
  async getItems() {
    return data;
  },
  async addItem(item: ProductWithoutId) {
    const newProduct: Product = {
      id: randomUUID(),
      ...item
    }

    data.push(newProduct);
    await this.save();

    return newProduct;
  },
  async save() {
    await fs.writeFile(fileName, JSON.stringify(data, null, 2));
  }
};

export default fileDb;