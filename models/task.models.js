const format = require("pg-format");
db = require("../db/connection");

exports.receiveAll = () => {
  let queryStr = `SELECT * FROM drugs`;
  return db.query(queryStr).then(({ rows }) => {
    return rows;
  });
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
