const drugsData = require("../data/drugs");
const shopsData = require("../data/stores");
const seed = require("./seed");
const db = require("../connection");

seed({ drugsData, shopsData }).then(() => db.end());
