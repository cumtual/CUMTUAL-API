import mysql from "mysql2/promise";
import dotenv from 'dotenv';
dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE, DB_PORT } = process.env;

export const dbSettings = {
   host:DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    server: DB_SERVER,
    database: DB_DATABASE,
    port:DB_PORT
    // options: {
    //   trustServerCertificate: true,
    //   trustedConnection: false,  
    // },
  };

  export async function getConnection(){
    try{
         const connection = await mysql.createConnection(dbSettings);
        //const result = await connection.execute("select 1");
         //console.log(result);
         console.log("CONNECTION SUCCESFULLY");
        return connection;
    }
    catch(error){
      console.log(error)
        console.log("Error to database connect")
    }
  }
   getConnection();
   export { mysql }; 