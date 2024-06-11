const seq = require("../util/db");
const Sequelize = require("sequelize");

const RoomStay = seq.define("RoomStay", {
  DataHyrjes: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  DataDaljes: Sequelize.DATE,
});

module.exports = RoomStay;
