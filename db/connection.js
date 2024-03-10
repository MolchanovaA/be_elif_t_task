const { Pool } = require("pg");

// let config = {
//   user: "alina",
//   password: "nnn",
//   database: "drug_shops",
//   port: 5432,
//   // connectionString: process.env.DATABASE_URL,
//   connectionString:
//     "postgres://yiufbthy:y7cqjTBjhJGez-EN05U3IshmHTGmzMiz@surus.db.elephantsql.com/yiufbthy",
// };

// const config = {
//   user: "yiufbthy",
//   password: "y7cqjTBjhJGez-EN05U3IshmHTGmzMiz",
//   host: "surus.db.elephantsql.com",
//   port: 5432,
//   database: "yiufbthy",
// };

const config = { connectionString: process.env.DATABASE_URL };

const pool = new Pool(config);

module.exports = pool;
