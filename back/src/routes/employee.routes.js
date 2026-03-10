const express = require("express")
const router = express.Router()

const employeeController = require("../controllers/employee.controller")

router.get("/", employeeController.listEmployees)
router.post("/", employeeController.createEmployee)

module.exports = router