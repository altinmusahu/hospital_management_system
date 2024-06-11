const seq = require("../util/db");
const Sequelize = require("sequelize");

const Appointment = seq.define("Appointment", {
  Id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.DataTypes.UUIDV4,
  },
  Date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  Pershkrimi: Sequelize.TEXT,
  Statusi: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "Pending",
  },
});

module.exports = Appointment;
