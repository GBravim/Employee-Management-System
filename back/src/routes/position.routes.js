const express = require("express")
const router = express.Router()

const positionController = require("../controllers/position.controller")

router.get("/", positionController.list)
router.post("/", positionController.create)

module.exports = router