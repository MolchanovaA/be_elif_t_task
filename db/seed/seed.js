const db = require("../connection");
const format = require("pg-format");

const seed = ({ drugsData, shopsData }) => {
  // Drop & create tables
  return db
    .query(`DROP TABLE IF EXISTS shops CASCADE;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS drugs CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users_cart CASCADE;`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE shops (
          shop_id SERIAL PRIMARY KEY,
          shop_name VARCHAR(50) NOT NULL
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE drugs (
          drug_id SERIAL PRIMARY KEY,
          drug_name VARCHAR(100),
          price INT,
          added DATE,
          store_id INT,
          FOREIGN KEY (store_id) REFERENCES shops(shop_id)
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE users (
          user_id SERIAL PRIMARY KEY,
          name VARCHAR(100)
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE users_cart (
          user_cart_id SERIAL PRIMARY KEY,
          selected_user_id INTEGER REFERENCES users(user_id),
  selected_drug_id INTEGER REFERENCES drugs(drug_id)
        );
      `);
    })
    .then(() => {
      // Insert shops data
      const shopsRows = shopsData.map(({ shop_name }) => {
        return [shop_name];
      });
      const shopsInsertQuery = format(
        `INSERT INTO shops (shop_name) VALUES %L;`,
        shopsRows
      );
      return db.query(shopsInsertQuery);
    })
    .then(() => {
      // Insert drugs data
      const drugsRows = drugsData.map(({ title, price, date, store_id }) => {
        return [title, price, date, store_id];
      });

      const drugsInsertQuery = format(
        `INSERT INTO drugs 
          (drug_name, price, added, store_id) 
        VALUES %L;`,
        drugsRows
      );
      return db.query(drugsInsertQuery);
    });
};

module.exports = seed;
