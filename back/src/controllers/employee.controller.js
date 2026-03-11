const employeeService = require("../services/employee.service")

exports.createEmployee = async (req, res) => {

  try {

    const employee = await employeeService.create(req.body)

    res.json(employee)

  } catch (error) {

    res.status(400).json({ error: error.message })

  }

}

exports.listEmployees = async (req, res) => {

  const employees = await employeeService.getAll(req.query)

  res.json(employees)

}

exports.getEmployeeByName = async (req, res) => {

  try {

    const employees = await employeeService.getByName(
      req.params.name
    )

    if (employees.length === 0) {
      return res.status(404).json({
        error: "Nenhum funcionário encontrado"
      })
    }

    res.json(employees)

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}

exports.updateEmployee = async (req, res) => {

  try {

    const employee = await employeeService.update(
      req.params.id,
      req.body
    )

    res.json(employee)

  } catch (error) {

    res.status(400).json({ error: error.message })

  }

}

exports.deleteEmployee = async (req, res) => {

  try {

    await employeeService.delete(req.params.id)

    res.json({
      message: "Funcionário removido com sucesso"
    })

  } catch (error) {

    res.status(400).json({ error: error.message })

  }

}