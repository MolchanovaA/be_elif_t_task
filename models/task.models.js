const format = require("pg-format");
const db = require("../db/connection");
const fs = require("fs/promises");

exports.receiveAll = ({ sortby, order }) => {
  const allowed_sorting_opt = ["added", "price"];
  const allowedOrder = ["asc", "desc"];

  let queryStr = `SELECT * FROM drugs `;
  if (allowed_sorting_opt.includes(sortby)) {
    queryStr += `ORDER BY ${sortby}`;
  }
  if (order && allowedOrder.includes(order)) {
    queryStr += ` ${order};`;
  }

  return db
    .query(queryStr)
    .then(({ rows }) => {
      return rows;
    })
    .catch((err) => err);
};

exports.receiveDrugsByShopId = (shopId) => {
  let queryStr = `SELECT * FROM drugs WHERE store_id= $1`;
  return db.query(queryStr, [shopId]).then(({ rows }) => {
    if (!rows.length) {
      return Promise.reject({ code: 404, msg: "not found" });
    }
    return rows;
  });
};

exports.saveToDB = (body_to_save) => {
  let queryStr = `SELECT * FROM users;`;
  return db
    .query(queryStr)
    .then(({ rows }) => {
      return "user" + (rows.length + 1);
    })
    .then((userName) => {
      console.log(userName);
      const queryStr = "INSERT INTO users (name) VALUES %L RETURNING *;";
      return db.query(format(queryStr, [[userName]]));
    })
    .then(({ rows }) => {
      let user_id = rows[0].user_id;
      let user_drug_pairs = body_to_save.body.drug_ids.map((i) => {
        return [user_id, i];
      });
      const queryStr =
        "INSERT INTO users_cart (selected_user_id, selected_drug_id) VALUES %L RETURNING *;";
      return db.query(format(queryStr, user_drug_pairs));
    });
};

exports.receiveAllEndpoints = () => {
  const endpointsFile = "endpoints.json";
  return fs.readFile(endpointsFile, "utf-8").then((dataEndpoints) => {
    return dataEndpoints;
  });
};
