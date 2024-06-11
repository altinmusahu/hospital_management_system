const seq = require("../util/db");
const Sequelize = require("sequelize");

const Medicament = seq.define("Medicament", {
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
  Prodhuesi: Sequelize.STRING,
  "Masa(mg)": {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { min: 1 },
  },
  JepetPaRecete: { type: Sequelize.BOOLEAN, allowNull: false },
});

module.exports = Medicament;
