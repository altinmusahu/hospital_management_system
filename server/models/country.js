const seq = require("../util/db");
const Sequelize = require("sequelize");

const Country = seq.define(
  "Country",
  {
    Shteti: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
  },
  { timestamps: false }
);
module.exports = Country;
