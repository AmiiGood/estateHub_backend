import dotenv from "dotenv";
dotenv.config();
import { Pool } from "pg";
import { Sequelize } from "sequelize";

const hostg = process.env.HOSTG;
const userg = process.env.USERG;
const passwordg = process.env.PASSWORDG;
const databaseg = process.env.DATABASEG;
const portg = process.env.PORTG;

const databaseConnection = new Sequelize(databaseg, userg, passwordg, {
  host: hostg,
  dialect: "postgres",
  port: portg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

export default databaseConnection;
