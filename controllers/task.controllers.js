const {
  receiveAll,
  receiveDrugsByShopId,
} = require("../models/task.models.js");

exports.getAll = (req, res, next) => {
  receiveAll().then((allDrugs) => {
    res.status(200).send(allDrugs);
  });
};

exports.getDrugsByShopId = (req, res, next) => {
  const { shop_id } = req.params;

  receiveDrugsByShopId(shop_id)
    .then((drugs_by_shop) => {
      console.log("SHOP", drugs_by_shop);
      res.status(200).send(drugs_by_shop);
    })
    .catch((err) => {
      console.log("ERROR", err);
      next(err);
    });
};
