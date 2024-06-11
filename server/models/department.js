const seq = require("../util/db");
const Sequelize = require("sequelize");

const Department = seq.define("Department", {
  Id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.DataTypes.UUIDV4,
  },
  Name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Department;
