import multer from "multer";
import path from "path";
import config from "./config";
import {promises as fs} from "fs";
import {randomUUID} from "node:crypto";

const imageStorage = multer.diskStorage({
  destination: async (req, file, callback) => {
    const destDir = path.join(config.publicPath, 'images');  // 'db/JavaScript/.../.../shop-api/public/images'
    await fs.mkdir(destDir, { recursive: true });
    callback(null, destDir);
  },
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname); // '123.jpg' => .jpg
    const newFileName = randomUUID() + extension; // 1234566 + .jpg
    callback(null, newFileName);
  }
});

export const imagesUpload = multer({storage: imageStorage});