const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } =
  process.env;

const dbSettings = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
  // options: {
  //   trustServerCertificate: true,
  //   trustedConnection: false,
  // },
};

async function getConnection() {
  try {
    const connection = await mysql.createConnection(dbSettings);
    console.log("CONNECTION SUCCESFULLY");
    return connection;
  } catch (error) {
    console.log(error);
    console.log("Error to database connect");
  }
}
getConnection();

module.exports = { dbSettings, getConnection, mysql };
