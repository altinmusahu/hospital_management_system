const router = require("express").Router();
const staffController = require("../controllers/staff");
const isAuth = require("../util/auth").isAuth;

router.get("/appointments", isAuth, staffController.getMyAssignedAppointments);
router.post("/prescription/:id", isAuth, staffController.createPrescription);
router.post("/assign-room/:id", isAuth, staffController.assignPatientRoom);

module.exports = router;
