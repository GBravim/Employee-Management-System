const employeeService = require("../services/employee.service")

exports.listEmployees = async (req, res) => {
  const employees = await employeeService.getAll()
  res.json(employees)
}

exports.createEmployee = async (req, res) => {
  const employee = await employeeService.create(req.body)
  res.json(employee)
}