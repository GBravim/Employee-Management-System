const express = require("express")
const router = express.Router()

const employeeController = require("../controllers/employee.controller")
const authMiddleware = require("../middleware/auth.middleware")
const roleMiddleware = require("../middleware/role.middleware")

router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER", "VIEWER"),
  employeeController.listEmployees
)

router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  employeeController.createEmployee
)

module.exports = router