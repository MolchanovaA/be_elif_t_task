const { Pool } = require("pg");

let config = {
  user: "alina",
  password: "nnn",
  database: "drug_shops",
  port: 5432,
  connectionString: process.env.DATABASE_URL,
};

const ENV = process.env.NODE_ENV || "development";
// if (ENV === "production") {
//   config.connectionString = process.env.DATABASE_URL;
//   config.max = 2;
// }

const pool = new Pool(config);

module.exports = pool;
