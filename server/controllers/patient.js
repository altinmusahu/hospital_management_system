const fs = require("fs");
const Patient = require("../models/patient");
const Country = require("../models/country");
const bcrypt = require("bcryptjs");
const { Staff, Doctor } = require("../models/staff");
const { Op } = require("sequelize");
const Appointment = require("../models/appointment");
const { generateToken } = require("../util/auth");
const _db = require("../util/nosqlConfig").getDb;
const crypto = require("crypto");
const sendEmail = require("../util/sendEmail");
const { ObjectId } = require("mongodb");
const Department = require("../models/department");
const Prescription = require("../models/prescription");
const path = require("path");
const PDFDocument = require("pdfkit");
const template = require("../util/reportTemplate");

exports.register = async (req, res, next) => {
  const userExists = await _db()
    .collection("temp_users")
    .findOne({ Email: req.body.Email });
  if (userExists)
    return res.status(409).json({ message: "The user already exists." });
  const { Mosha, password } = req.body;
  const Password = await bcrypt.hash(password, 12);
  const temp = await _db()
    .collection("temp_users")
    .insertOne({
      ...req.body,
      Mosha: +Mosha,
      password: Password,
      isVerified: false,
    });
  const tokenGenerated = crypto.randomBytes(32).toString("hex");
  const token = await _db()
    .collection("token")
    .insertOne({ userId: temp.insertedId, token: tokenGenerated });
  const url = `http://localhost:5173/users/${temp.insertedId.toString()}/verify/${tokenGenerated}`;
  await sendEmail(req.body.Email, "Verify Email", url);
  // if (created) {
  //   return res.status(201).json({ message: "Created, go to login." });
  // }
  res
    .status(201)
    .send({ message: "An Email sent to your account. Please verify!" });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const isStaff = req.query.staff === "true";
  let user;

  if (isStaff) {
    user = await Staff.findOne({ where: { Email: email } });
  } else {
    user = await _db().collection("temp_users").findOne({ Email: email });
    if (user && !user?.isVerified) {
      let token = await _db().collection("token").findOne({ userId: user._id });
      if (!token) {
        const generatedToken = crypto.randomBytes(32).toString("hex");
        token = await _db().collection("token").insertOne({
          userId: user._id,
          token: generatedToken,
        });
        const url = `http://localhost:5173/users/${user._id.toString()}/verify/${generatedToken}`;
        await sendEmail(user.Email, "Verify Email", url);
      }
      return res
        .status(400)
        .json({ message: "An email was sent to your account" });
    }
    user = await Patient.findOne({ where: { Email: email } });
  }
  if (user) {
    const isAuth = await bcrypt.compare(password, user.Password);
    if (isAuth) {
      //&&user.isVerified
      const token = generateToken(
        user.Id,
        user.Emri,
        user.Mbiemri,
        user.Email,
        user.Roli,
        false
      );
      const refreshToken = generateToken(
        user.Id,
        user.Emri,
        user.Mbiemri,
        user.Email,
        user.Roli,
        true
      );
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({
        message: "Logged In Successfully!",
        token,
        refreshToken,
        isLoggedIn: true,
        Roli: user.Roli,
        id: user.Id,
      });
    }
    return res.status(401).json({
      message: "Incorrect password",
      isLoggedIn: false,
    });
  }

  return res
    .status(404)
    .json({ message: "Incorrect email", isLoggedIn: false });
};

exports.getMyProfile = async (req, res, next) => {
  const id = req.userId;
  const user = await Patient.findByPk(id);
  if (user) {
    return res.status(200).json(user);
  }
  return res.status(404).json({ message: "Not found an user" });
};

exports.verifyMyAccount = async (req, res, next) => {
  try {
    const user = await _db()
      .collection("temp_users")
      .findOne({ _id: new ObjectId(req.params.id), isVerified: false });
    if (!user)
      return res.status(400).json({ message: "No user found with this id" });

    const token = await _db().collection("token").findOne({
      token: req.params.token,
      userId: user._id,
    });
    if (!token) return res.status(400).json({ message: "No token provided" });

    const { Emri, Mbiemri, Mosha, Email, City, Shteti, Roli } = user;
    const [verifiedUser, created] = await Patient.findOrCreate({
      where: { Email },
      defaults: {
        Emri,
        Mbiemri,
        Mosha,
        Email,
        Password: user.password,
        City,
        Shteti,
        Roli,
      },
    });
    if (created) {
      await _db()
        .collection("temp_users")
        .updateOne(
          { _id: new ObjectId(req.params.id), isVerified: false },
          { $set: { isVerified: true } }
        );
      await _db()
        .collection("token")
        .deleteOne({ token: req.params.token, userId: user._id });
      res.status(200).send({ message: "Email verified successfully" });
    }
    return res.status(409).json({ message: "The user already exists." });
  } catch (err) {
    console.error(err);
  }
};

exports.editMyProfile = async (req, res, next) => {
  const Id = req.userId;
  const { Emri, Mbiemri, Mosha, Email, City, Shteti } = req.body;
  if (Email) {
    const existEmail = await Patient.findOne({
      where: {
        Email: {
          [Op.eq]: Email,
        },
        Id: {
          [Op.ne]: Id,
        },
      },
    });
    if (existEmail) {
      return res.status(409).json({ message: "The email is already taken." });
    }
  }

  const result = await Patient.update(
    { Emri, Mbiemri, Mosha, Email, City, Shteti },
    { where: { Id } }
  );
  if (result[0] === 1) {
    return res.status(200).json({ message: "Updated" });
  }
  return res.status(404).json({ message: "Something went wrong!" });
};

exports.updatePassword = async (req, res, next) => {
  const Id = req.userId;
  const { currentPassword, newPassword, confirmedPassword } = req.body;
  const { Password } = await Patient.findByPk(Id);
  const isMatch = await bcrypt.compare(currentPassword, Password);
  if (isMatch && newPassword === confirmedPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const result = await Patient.update(
      { Password: hashedPassword },
      { where: { Id } }
    );
    if (result[0] === 1) {
      return res.status(200).json({ message: "Updated" });
    }
    return res.status(404).json({ message: "Something went wrong!" });
  }
  return res.status(400).json({ message: "Your old password is incorrect" });
};

exports.getAllPatients = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Patient.findAndCountAll({
      offset: parseInt(offset, 10),
      limit: parseInt(limit, 10),
    });

    return res.status(200).json({
      total: count,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      data: rows,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteMyProfile = async (req, res, next) => {
  const Id = req.userId;
  const result = await Patient.destroy({ where: { Id } });

  if (result === 1) {
    return res.status(200).json({ message: "Deleted" });
  }
  return res.status(404).json({ message: "Something went wrong" });
};

exports.getMyAppointments = async (req, res, next) => {
  const Id = req.userId;
  const patient = await Patient.findByPk(Id);
  const result = await patient.getAppointments({
    include: [
      {
        model: Doctor,
        include: [
          {
            model: Staff,
          },
        ],
      },
      {
        model: Department,
      },
    ],
  });
  return res.status(200).json(result);
};

exports.createAppointment = async (req, res, next) => {
  const { Date, Pershkrimi, DepartmentId } = req.body;
  const user = await Patient.findByPk(req.userId);
  if (user) {
    const result = await user.createAppointment({
      Date,
      Pershkrimi,
      Statusi: "Pending",
      DepartmentId,
    });
    return res.status(200).json(result);
  }
  return res.status(404).json({ message: "Not found an user" });
};

exports.editMyAppointment = async (req, res, next) => {
  const appointmentId = req.params.id;
  const { Date, Pershkrimi, DepartmentId } = req.body;
  const appointment = await Appointment.findOne({
    where: { Id: appointmentId, PatientId: req.userId },
  });
  if (appointment) {
    appointment.Date = Date;
    appointment.Pershkrimi = Pershkrimi;
    appointment.DepartmentId = DepartmentId;
    const result = await appointment.save();
    console.log(result);

    return res.status(200).json({ message: "Updated" });
  }
  return res
    .status(404)
    .json({ message: "Not found your appointment with this id" });
};

exports.deleteMyAppointment = async (req, res, next) => {
  const appointmentId = req.params.id;
  const result = await Appointment.destroy({
    where: { Id: appointmentId, PatientId: req.userId },
  });
  if (result === 1) {
    return res.status(200).json({ message: "Deleted" });
  }
  return res.status(404).json({ message: "Something went wrong" });
};

exports.getAppointmentResults = async (req, res, next) => {
  const Id = req.params.id;
  const appointment = await Appointment.findOne({
    where: { Id, PatientId: req.userId, Statusi: "Completed" },
    include: [
      "RoomStays",
      { model: Prescription, include: "Medicament" },
      "Patient",
      "Department",
      { model: Doctor, include: "Staff" },
    ],
  });

  const result = {
    Id: appointment.Id,
    Date: appointment.Date,
    hasPrescription: appointment.Prescriptions.length > 0,
    Results:
      appointment.RoomStays.length === 0
        ? appointment.Prescriptions
        : appointment.RoomStays,
    Patient: {
      Emri: appointment.Patient.Emri,
      Mbiemri: appointment.Patient.Mbiemri,
    },
    Department: appointment.Department.Name,
    Doctor: {
      Emri: appointment.Doctor.Staff.Emri,
      Mbiemri: appointment.Doctor.Staff.Mbiemri,
    },
  };
  return res.status(200).json(result);
};

exports.getReport = async (req, res, next) => {
  let unique = Math.random().toFixed(5) * 100000;
  const Id = req.params.id;

  const invoiceName = "report-" + ++unique + "_app-" + Id + ".pdf";
  const filePath = path.join(
    __dirname,
    "..",
    "storage",
    "reports",
    invoiceName
  );
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "application/pdf");

  const pdfDoc = new PDFDocument({ size: "A4" });
  pdfDoc.pipe(fs.createWriteStream(filePath));
  pdfDoc.pipe(res);

  const appointment = await Appointment.findOne({
    where: { Id, Statusi: "Completed" },
    include: [
      "RoomStays",
      { model: Prescription, include: "Medicament" },
      "Patient",
      "Department",
      { model: Doctor, include: "Staff" },
    ],
  });

  const result = {
    Id: appointment.Id,
    Date: appointment.Date,
    hasPrescription: appointment.Prescriptions.length > 0,
    Results:
      appointment.RoomStays.length === 0
        ? appointment.Prescriptions
        : appointment.RoomStays,
    Patient: {
      Emri: appointment.Patient.Emri,
      Mbiemri: appointment.Patient.Mbiemri,
    },
    Department: appointment.Department.Name,
    Doctor: {
      Emri: appointment.Doctor.Staff.Emri,
      Mbiemri: appointment.Doctor.Staff.Mbiemri,
    },
  };
  template(pdfDoc, result, unique);
  pdfDoc.end();
};

exports.getAllCountries = (req, res, next) => {
  Country.findAll().then((countries) => res.status(200).json(countries));
};
