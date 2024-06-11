const router = require("express").Router();
const patientController = require("../controllers/patient");
const isAuth = require("../util/auth").isAuth;

router.get("/my-appointments", isAuth, patientController.getMyAppointments);
router.post("/appointment", isAuth, patientController.createAppointment);
router.put(
  "/edit-my-appointment/:id",
  isAuth,
  patientController.editMyAppointment
);
router.delete(
  "/delete-my-appointment/:id",
  isAuth,
  patientController.deleteMyAppointment
);

router.get("/result/:id", isAuth, patientController.getAppointmentResults);
router.get("/report/:id", patientController.getReport);

router.get("/my-profile", isAuth, patientController.getMyProfile);
router.put("/edit-my-profile", isAuth, patientController.editMyProfile);
router.put("/update-password", isAuth, patientController.updatePassword);
router.delete("/delete-my-profile", isAuth, patientController.deleteMyProfile);
router.patch("/api/users/:id/verify/:token", patientController.verifyMyAccount);
router.delete(
  "/delete-my-appointment/:id",
  isAuth,
  patientController.deleteMyAppointment
);

module.exports = router;
