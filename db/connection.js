const { Pool } = require("pg");

// if (!process.env.PGDATABASE) {
//   throw new Error("PGDATABASE not set!");
// }

const pool = new Pool({
  user: "alina",
  password: "nnn",
  database: "drug_shops",
  port: 5432,
});

module.exports = pool;
