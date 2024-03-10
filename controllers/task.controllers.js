const {
  receiveAll,
  receiveDrugsByShopId,
  saveToDB,
  receiveAllEndpoints,
} = require("../models/task.models.js");

exports.getAll = (req, res, next) => {
  const query = req.query;
  receiveAll(query)
    .then((allDrugs) => {
      res.status(200).send(allDrugs);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getDrugsByShopId = (req, res, next) => {
  const { shop_id } = req.params;

  receiveDrugsByShopId(shop_id)
    .then((drugs_by_shop) => {
      res.status(200).send(drugs_by_shop);
    })
    .catch((err) => {
      next(err);
    });
};

exports.addtocart = (req, res, next) => {
  if (!req.body.body) {
    return res.status(400).send({ msg: "bad request" });
  }
  saveToDB(req.body);
  return res.status(201).send({ msg: "SAVED" });
};

exports.showEndpoints = (req, res, next) => {
  receiveAllEndpoints().then((data) => {
    res.status(200).send(JSON.parse(data));
  });
};
