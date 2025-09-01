import path from "path";

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  mysqlDb: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'shop'
  }
};

export default config;