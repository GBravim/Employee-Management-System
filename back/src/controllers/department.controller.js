const departmentService = require("../services/department.service")

exports.list = async (req, res) => {
  const departments = await departmentService.getAll()
  res.json(departments)
}

exports.create = async (req, res) => {
  const department = await departmentService.create(req.body)
  res.json(department)
}