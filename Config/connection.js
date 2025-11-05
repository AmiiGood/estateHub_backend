import dotenv from "dotenv";
dotenv.config();
import { Pool } from "pg";
import { Sequelize } from "sequelize";

const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const port = process.env.PORT;

const hostg = process.env.HOSTG;
const userg = process.env.USERG;
const passwordg = process.env.PASSWORDG;
const databaseg = process.env.DATABASEG;
const portg = process.env.PORTG;
console.log(hostg, userg, passwordg, databaseg, portg);

const databaseConnection = new Sequelize(databaseg, userg, `${passwordg}`, {
  host: hostg,
  dialect: "postgres",
  port: portg,
});

/*
const pool = new Pool({
  host: hostg,
  user: userg,
  password: `${passwordg}`,
  database: databaseg,
  port: portg,
});

pool.connect((err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Conectado con exito");
  }
});

*/

export default databaseConnection;
