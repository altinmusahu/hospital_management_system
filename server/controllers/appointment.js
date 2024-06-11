const Appointment = require("../models/appointment");
const { Sequelize } = require("sequelize");
const seq = require("../util/db");

exports.assignDoctor = async (req, res, next) => {
  const { doctorId } = req.body;
  const appointment = await Appointment.findOne({
    where: { Id: req.params.id, Statusi: "Pending", DoctorId: null },
  });
  if (appointment) {
    appointment.DoctorId = doctorId;
    appointment.Statusi = "Assigned";
    const result = await appointment.save();
    console.log(result);
    return res.status(200).json({ message: "Updated successfully" });
  }
  return res.status(404).json({ message: "Something went wrong" });
}; //check what result is holding

exports.appointmentsPerMonthReport = async (req, res, next) => {
  const month = +req.query.month;
  const query = `select * from Appointments
          where MONTH(date)=${month}
          order by createdAt desc`;
  const result = await seq.query(query);
  return res.status(200).json(result[0]);
};

exports.getAppointmentsPerMonth = async (req, res, next) => {
  try {
    const result = await Appointment.findAll({
      attributes: [
        [Sequelize.fn("MONTH", Sequelize.col("Date")), "month"],
        [Sequelize.fn("YEAR", Sequelize.col("Date")), "year"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      group: [
        [Sequelize.fn("YEAR", Sequelize.col("Date"))],
        [Sequelize.fn("MONTH", Sequelize.col("Date"))],
      ],
      order: [
        [Sequelize.fn("YEAR", Sequelize.col("Date")), "ASC"],
        [Sequelize.fn("MONTH", Sequelize.col("Date")), "ASC"],
      ],
    });

    const appointmentsPerMonth = result.map((appointment) => ({
      month: appointment.get("month"),
      year: appointment.get("year"),
      count: appointment.get("count"),
    }));

    res.status(200).json({ data: appointmentsPerMonth });
  } catch (error) {
    console.error("Error fetching appointments per month:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
