const seq = require("../util/db");
const Sequelize = require("sequelize");

const Role = seq.define(
  "Role",
  {
    Nr: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    Roli: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { timestamps: false }
);
module.exports = Role;
