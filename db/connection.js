const { Pool } = require("pg");

let config = {
  user: "alina",
  password: "nnn",
  database: "drug_shops",
  port: 5432,
  // connectionString: process.env.DATABASE_URL,
  connectionString:
    "postgres://yiufbthy:y7cqjTBjhJGez-EN05U3IshmHTGmzMiz@surus.db.elephantsql.com/yiufbthy",
};

const pool = new Pool(config);

module.exports = pool;
