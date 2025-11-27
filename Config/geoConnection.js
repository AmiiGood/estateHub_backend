import { Pool } from "pg";

const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const port = process.env.PORT;

const pool = new Pool({
  host: host,
  user: user,
  password: password,
  database: database,
  port: port,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect((err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Conectado con exito");
  }
});

export default pool;
