const seq = require("../util/db");
const Sequelize = require("sequelize");

const Room = seq.define("Room", {
  Id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.DataTypes.UUIDV4,
  },
  Emri: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  Kapaciteti: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Room;
