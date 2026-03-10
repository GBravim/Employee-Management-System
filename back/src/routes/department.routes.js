const express = require("express")
const router = express.Router()

const departmentController = require("../controllers/department.controller")
const authMiddleware = require("../middleware/auth.middleware")

router.get("/",authMiddleware , departmentController.list)
router.post("/",authMiddleware , departmentController.create)

module.exports = router