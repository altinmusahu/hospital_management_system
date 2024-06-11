const { Staff, Doctor, Nurse } = require("../models/staff");
const Department = require("../models/department");
const Room = require("../models/room");
const Appointment = require("../models/appointment");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const Patient = require("../models/patient");

exports.getStaff = async (req, res, next) => {
  const staff = await Staff.findAll();
  return res.status(200).json(staff);
};

exports.getOneStaff = async (req, res, next) => {
  const id = req.params.staffId;
  const result = [];
  let staff = await Staff.findByPk(id);
  result.push(staff);
  if (!staff) {
    return res.status(404).json({ message: "Staff not found" });
  }
  if (staff.Roli == 2) {
    const nurse = await Nurse.findByPk(id);
    result.push(nurse);
  } else if (staff.Roli == 3) {
    const doctor = await Doctor.findByPk(id);
    result.push(doctor);
  }
  return res.status(200).json(result);
};

exports.postStaff = async (req, res, next) => {
  const { Emri, Mbiemri, Email, password, DataPunesimit, Roli } = req.body;
  const Password = await bcrypt.hash(password, 12);
  const staffExists = await Staff.findOne({ where: { Email } });
  if (staffExists) {
    return res.status(403).json({ message: "Staff's email is already taken!" });
  }
  const staff = await Staff.create({
    Emri,
    Mbiemri,
    Email,
    Password,
    DataPunesimit,
    Roli,
  });
  let result;
  if (staff._options.isNewRecord) {
    if (staff.Roli == 3) {
      const department = await Department.findByPk(req.body.addedAttribute);
      result = await department.createDoctor({ Id: staff.Id });
    } else if (staff.Roli == 2) {
      result = await Nurse.create({
        Id: staff.Id,
        Nderrimi: req.body.addedAttribute,
      });
    }
    return res.status(201).json(result ?? staff);
  }
  return res.status(404).json({ message: "Something went wrong" });
};

exports.staffDetails = async (req, res, next) => {
  const Id = req.userId;
  const staff = await Staff.findOne({
    where: { Id },
    include: [
      {
        model: Doctor,
        include: [
          {
            model: Department,
          },
        ],
      },
      { model: Nurse },
    ],
  });

  let result;
  if (staff.Roli === 3) {
    result = {
      ...staff.dataValues,
      DepartmentId: staff.dataValues.Doctors[0].DepartmentId,
    };
  } else {
    result = {
      ...staff.dataValues,
      Nderrimi: staff.dataValues.Nurses[0].Nderrimi,
    };
  }
  return res.status(200).json(result);
};

exports.deleteStaff = async (req, res, next) => {
  const staff = await Staff.findByPk(req.params.staffId);
  if (staff.Roli === 3) {
    const deletedResult = await Doctor.destroy({
      where: { Id: req.params.staffId },
    });
  } else if (staff.Roli === 2) {
    const deletedResult = await Nurse.destroy({
      where: { Id: req.params.staffId },
    });
  } else {
    return res.status(404).json({ message: "Something went wrong" });
  }
  const result = await Staff.destroy({ where: { Id: req.params.staffId } });
  if (result === 1) {
    return res.status(200).json({ message: "Deleted" });
  }
  return res.status(404).json({ message: "Something went wrong" });
};

exports.updateStaff = async (req, res, next) => {
  const Id = req.params.staffId;
  const { Emri, Mbiemri, Email, Password, DataPunesimit } = req.body;
  const staff = await Staff.findByPk(Id);
  if (!staff) {
    return res.status(404).json({ message: "No staff found with this id" });
  }
  if (Email) {
    const existEmail = await Staff.findOne({
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
  const hashedPassword = await bcrypt.hash(Password, 12);
  const result = await staff.update({
    Emri,
    Mbiemri,
    Email,
    Password: hashedPassword,
    DataPunesimit,
  });
  if (staff.Roli === 3) {
    const { DepartmentId } = req.body;
    const updatedResult = await Doctor.update(
      { DepartmentId },
      { where: { Id } }
    );
  } else if (staff.Roli === 2) {
    const { Nderrimi } = req.body;
    const updatedResult = await Nurse.update({ Nderrimi }, { where: { Id } });
  }
  return res.status(200).json({ message: "Staff has been updated" });
};

exports.getAllDoctors = async (req, res, next) => {
  const result = await Doctor.findAll({ include: [Department, Staff] });
  return res.status(200).json(result);
};

exports.getAllNurses = async (req, res, next) => {
  const result = await Nurse.findAll({ include: [Staff] });
  return res.status(200).json(result);
};

exports.findDoctors = async (req, res, next) => {
  const id = req.params.departmentId;
  if (id) {
    const result = await Doctor.findAll({
      attributes: ["Id", "DepartmentId"],
      include: [{ model: Staff, attributes: ["Emri", "Mbiemri"] }],
      where: { DepartmentId: id },
    });
    return res.status(200).json(result);
  }
  return res.status(404).json({ message: "Invalid id" });
};

exports.createRoom = async (req, res, next) => {
  const { Emri, Kapaciteti, nurseId } = req.body;
  const nurse = await Nurse.findByPk(nurseId);
  const result = await nurse.createRoom({ Emri, Kapaciteti });
  return res.status(201).json(result);
};

exports.getAllRooms = async (req, res, next) => {
  const result = await Room.findAll({
    include: [
      {
        model: Nurse,
        through: "Manage",
        include: [
          {
            model: Staff,
          },
        ],
      },
    ],
  });
  return res.status(200).json(result);
};

exports.deleteRoom = async (req, res, next) => {
  const result = await Room.destroy({ where: { Id: req.params.id } });
  if (result === 1) {
    return res.status(200).json({ message: "Deleted" });
  }
  return res.status(404).json({ message: "Something went wrong" });
};

exports.updateRoom = async (req, res, next) => {
  const roomId = req.params.id;
  const { Emri, Kapaciteti } = req.body;
  const room = await Room.findByPk(roomId);
  if (room) {
    room.Emri = Emri;
    room.Kapaciteti = Kapaciteti;
    await room.save();
    return res.status(200).json({ message: "Updated" });
  }
  return res.status(404).json({ message: "Something went wrong" });
};

exports.getAllAppointments = async (req, res, next) => {
  const result = await Appointment.findAndCountAll({
    include: [Patient, Doctor, Department],
  });
  return res.status(200).json(result);
};

exports.getMyAssignedAppointments = async (req, res, next) => {
  const doctor = await Doctor.findByPk(req.userId);
  const result = await doctor.getAppointments({
    include: ["Patient"],
  });
  return res.status(200).json(result);
};

//getMyAssignedRooms -nurse

exports.cancelAppointment = async (req, res, next) => {
  const id = req.params.id;
  const appointment = await Appointment.findByPk(id);
  if (appointment) {
    appointment.Statusi = "Cancelled";
    await appointment.save();
    return res.status(200).json({ message: "Cancelled Successfully" });
  }
  return res.status(404).json({ message: "Something went wrong" });
};

exports.createPrescription = async (req, res, next) => {
  const appointment = await Appointment.findByPk(req.params.id);
  const { Pershkrimi, Doza, Data, Kohezgjatja, MedicamentId, completed } =
    req.body;
  if (appointment) {
    const result = await appointment.createPrescription({
      Pershkrimi,
      DozaPerDite: Doza,
      DataNisjes: Data,
      Kohezgjatja,
      PatientId: appointment.PatientId,
      MedicamentId,
    });
    
    if (completed) {
      appointment.Statusi = "Completed";
      await appointment.save();
    }
    return res.status(201).json(result);
  }
  return res.status(404).json({ message: "Something went wrong" });
};

exports.assignPatientRoom = async (req, res, next) => {
  const appointment = await Appointment.findByPk(req.params.id);
  const { DataHyrjes, DataDaljes, RoomId } = req.body;
  if (appointment) {
    const result = await appointment.createRoomStay({
      DataHyrjes,
      DataDaljes,
      RoomId,
      PatientId: appointment.PatientId,
    });
    appointment.Statusi = "Completed";
    await appointment.save();
    return res.status(201).json(result);
  }
  return res.status(404).json({ message: "Something went wrong" });
};
