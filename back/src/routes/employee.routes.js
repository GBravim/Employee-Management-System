const express = require("express")
const router = express.Router()

const employeeController = require("../controllers/employee.controller")
const authMiddleware = require("../middleware/auth.middleware")

router.get("/",authMiddleware , employeeController.listEmployees)
router.post("/",authMiddleware , employeeController.createEmployee)

module.exports = router