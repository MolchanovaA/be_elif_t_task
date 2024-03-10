const express = require("express");

const {
  getAll,
  getDrugsByShopId,
  addtocart,
  showEndpoints,
} = require("./controllers/task.controllers.js");

const {
  error_handler,
  psql_errors,
  custom_errors,
  other_errors,
} = require("./error-handlers/error-handlers.js");

const app = express();

app.use(express.json());

app.get("/", showEndpoints);
app.get("/drugs", getAll);
app.get("/drugs/:shop_id", getDrugsByShopId);
app.post("/addtocart", addtocart);

app.all("*", error_handler);

app.use(psql_errors);
app.use(custom_errors);
app.use(other_errors);

module.exports = app;
