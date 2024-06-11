const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const Patient = require("./models/patient");
const mongoConnect = require("./util/nosqlConfig").mongoConnect;
const { Staff, Doctor, Nurse } = require("./models/staff");
const Medicament = require("./models/medicament");
const Department = require("./models/department");
const Appointment = require("./models/appointment");
const Room = require("./models/room");
const Role = require("./models/role");
const Country = require("./models/country");
const Prescription = require("./models/prescription");
const RoomStay = require("./models/room-stay");
const seq = require("./util/db");
const app = express();
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const patientRoutes = require("./routes/patient");
const doctorRoutes = require("./routes/doctor");
const medicament = require("./controllers/medicament").importMedicaments;
const multer = require("multer");
const { v4 } = require("uuid");

app.use(express.json());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./storage"),
  filename: (req, file, cb) => cb(null, `${v4()} - ${file.originalname}`),
});
const upload = multer({ storage });

app.use(cookieParser());

app.use("/admin", adminRoutes);
app.use("/upload/medicament", upload.single("file"), medicament);
app.use("/auth", authRoutes);
app.use("/doctor", doctorRoutes);
app.use(patientRoutes);

Patient.belongsTo(Country, { foreignKey: "Shteti", targetKey: "Shteti" });
Patient.belongsTo(Role, { foreignKey: "Roli", targetKey: "Nr" });
Staff.belongsTo(Role, { foreignKey: "Roli", targetKey: "Nr" });
Doctor.belongsTo(Staff, { foreignKey: "Id", targetKey: "Id" });
Department.hasMany(Doctor);
Doctor.belongsTo(Department, {
  onDelete: "SET NULL",
});
Staff.hasMany(Doctor, { foreignKey: "Id", targetKey: "Id" });
Staff.hasMany(Nurse, { foreignKey: "Id", targetKey: "Id" });
Nurse.belongsTo(Staff, { foreignKey: "Id", targetKey: "Id" });

Appointment.belongsTo(Patient, {
  onDelete: "SET NULL",
});
Patient.hasMany(Appointment);
Appointment.belongsTo(Department, { onDelete: "SET NULL" });
Department.hasMany(Appointment);
Appointment.belongsTo(Doctor, { onDelete: "SET NULL" });
Doctor.hasMany(Appointment);

Appointment.hasMany(Prescription);
Prescription.belongsTo(Appointment, {
  onDelete: "SET NULL",
});
Patient.hasMany(Prescription);
Prescription.belongsTo(Patient, {
  onDelete: "SET NULL",
});
Prescription.belongsTo(Medicament);
Medicament.hasMany(Prescription, { onDelete: "CASCADE" });

Nurse.belongsToMany(Room, { through: "Manage" });
Room.belongsToMany(Nurse, { through: "Manage" });

Room.hasMany(RoomStay, {
  onDelete: "CASCADE",
});
Appointment.hasMany(RoomStay, {
  onDelete: "SET NULL",
});
Patient.hasMany(RoomStay, {
  onDelete: "SET NULL",
});

seq.sync().then((result) =>
  mongoConnect(() => {
    app.listen(3000, () => console.log("App is listening on port 3000"));
  })
);
