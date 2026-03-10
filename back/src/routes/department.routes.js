const express = require("express")
const router = express.Router()

const departmentController = require("../controllers/department.controller")

router.get("/", departmentController.list)
router.post("/", departmentController.create)

module.exports = router