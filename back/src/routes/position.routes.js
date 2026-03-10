const express = require("express")
const router = express.Router()

const positionController = require("../controllers/position.controller")
const authMiddleware = require("../middleware/auth.middleware")

router.get("/",authMiddleware , positionController.list)
router.post("/",authMiddleware , positionController.create)

module.exports = router