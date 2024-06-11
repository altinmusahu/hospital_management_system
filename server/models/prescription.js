const seq = require("../util/db");
const Sequelize = require("sequelize");

const Prescription = seq.define("Prescription", {
  Pershkrimi: Sequelize.TEXT,
  DozaPerDite: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  DataNisjes: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.DataTypes.NOW,
  },
  Kohezgjatja: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Prescription;
