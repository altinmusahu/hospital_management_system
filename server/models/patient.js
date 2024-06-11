const seq = require("../util/db");
const Sequelize = require("sequelize");

const Patient = seq.define("Patient", {
  Id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.DataTypes.UUIDV4,
  },
  Emri: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Mbiemri: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Mosha: Sequelize.INTEGER,
  Email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  Password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  City: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Shteti: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Roli: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

module.exports = Patient;
