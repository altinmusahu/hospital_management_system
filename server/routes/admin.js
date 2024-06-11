const router = require("express").Router();
const patientController = require("../controllers/patient");
const departmentController = require("../controllers/department");
const staffController = require("../controllers/staff");
const medicamentController = require("../controllers/medicament");
const appointment = require("../controllers/appointment");
const { isAuth } = require("../util/auth");

router.get("/departments", departmentController.getDepartments);
router.post("/department", departmentController.createDepartment);
router.delete("/department/:id", departmentController.deleteDepartment);
router.put("/department/:id", departmentController.updateDepartment);

router.get("/all-staff", staffController.getStaff);
router.get("/all-doctors", staffController.getAllDoctors);
router.get("/all-nurses", staffController.getAllNurses);
router.get("/staff-details",isAuth, staffController.staffDetails); //need changes in client-side
router.post("/staff", staffController.postStaff);
router.get("/one-staff/:staffId", staffController.getOneStaff);
router.delete("/staff/:staffId", staffController.deleteStaff);
router.put("/staff/:staffId", staffController.updateStaff);

router.get("/rooms", staffController.getAllRooms);
router.post("/room", staffController.createRoom);
router.put("/room/:id", staffController.updateRoom);
router.delete("/room/:id", staffController.deleteRoom);

router.get("/medicaments", medicamentController.getAllMedicaments);
router.get("/medicament/details/:id", medicamentController.getOneMedicament);
router.post("/medicament", medicamentController.createMedicament);
router.delete("/medicament/:id", medicamentController.deleteMedicament);
router.put("/medicament/:id", medicamentController.updateMedicament);

router.get("/patients", patientController.getAllPatients);
router.get("/countries", patientController.getAllCountries);

router.get("/appointments", staffController.getAllAppointments);
router.patch("/cancel-appointment/:id", staffController.cancelAppointment);

router.get("/month-report", appointment.appointmentsPerMonthReport);

router.get("/appointments-per-month", appointment.getAppointmentsPerMonth);
router.patch("/assign-doctor/:id", appointment.assignDoctor);

router.get("/find-doctor/:departmentId", staffController.findDoctors);

module.exports = router;
