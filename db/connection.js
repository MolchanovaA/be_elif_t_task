const { Pool } = require("pg");

// if (!process.env.PGDATABASE) {
//   throw new Error("PGDATABASE not set!");
// }

let config = {
  user: "alina",
  password: "nnn",
  database: "drug_shops",
  port: 5432,
};
const ENV = process.env.NODE_ENV || "development";
if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}

const pool = new Pool(config);

module.exports = pool;
