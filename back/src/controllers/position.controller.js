const positionService = require("../services/position.service")

exports.list = async (req, res) => {
  const positions = await positionService.getAll()
  res.json(positions)
}

exports.create = async (req, res) => {
  const position = await positionService.create(req.body)
  res.json(position)
}