const {config} = require("dotenv")
config();

///CONNECTION WITH MYSQL DATABASE

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_USER || "localhost";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_SERVER = process.env.DB_SERVER || "localhost";
const DB_DATABASE = process.env.DB_DATABASE || "dbCumtual";
const DB_PORT = process.env.DB_PORT || 3306 ;

module.exports={
    PORT,
    DB_DATABASE,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_SERVER,
    DB_PORT
}