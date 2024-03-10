const { Pool } = require("pg");

// let config = {
//   user: "alina",
//   password: "nnn",
//   database: "drug_shops",
//   port: 5432,
// };

const config = { connectionString: process.env.DATABASE_URL };

const pool = new Pool(config);

module.exports = pool;
