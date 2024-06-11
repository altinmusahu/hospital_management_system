const seq = require("../util/db");
const Sequelize = require("sequelize");

const Staff = seq.define("Staff", {
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
  Email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  Password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  DataPunesimit: Sequelize.DATE,
  Roli: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

const Doctor = seq.define(
  "Doctor",
  {
    Id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
  },
  { timestamps: false }
);
const Nurse = seq.define(
  "Nurse",
  {
    Id: { type: Sequelize.UUID, allowNull: false, primaryKey: true },
    Nderrimi: Sequelize.STRING,
  },
  { timestamps: false }
);

module.exports = { Staff, Doctor, Nurse };
