import dotenv from "dotenv";
dotenv.config();

export default {
  development: {
    username: process.env.USERG,
    password: process.env.PASSWORDG,
    database: process.env.DATABASEG,
    host: process.env.HOSTG,
    dialect: "postgres",
    port: process.env.PORTG,
  },
};
