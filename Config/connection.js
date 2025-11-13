import dotenv from "dotenv";
dotenv.config();
import { Pool } from "pg";
import { Sequelize } from "sequelize";

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

export default databaseConnection;
