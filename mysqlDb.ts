import mysql, {Connection} from 'mysql2/promise';
import config from "./config";

let connection: Connection | null = null;

const mysqlDb = {
  async init() {
    connection = await mysql.createConnection(config.mysqlDb)
  },
  getConnection(): Connection {
    if (!connection) {
      throw new Error('Missing connection');
    }

    return connection;
  }
};

export default mysqlDb;