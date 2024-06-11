const router = require("express").Router();
const patientController = require("../controllers/patient");
const refresh = require("../util/auth").handleRefreshToken;
const logout = require("../util/auth").logoutAction;

router.post("/register", patientController.register);
router.post("/login", patientController.login);
router.patch("/refresh", refresh);
router.get("/logout", logout);

module.exports = router;
