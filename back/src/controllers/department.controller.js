const departmentService = require("../services/department.service")

exports.createDepartment = async (req, res) => {

  try {

    const department = await departmentService.create(req.body)

    res.json(department)

  } catch (error) {

    res.status(400).json({ error: error.message })

  }

}

exports.listDepartments = async (req, res) => {

  const departments = await departmentService.getAll()

  res.json(departments)

}

exports.getDepartmentByName = async (req, res) => {

  try {

    const departments = await departmentService.getByName(req.params.name)

    if (departments.length === 0) {
      return res.status(404).json({
        error: "Departamento não encontrado"
      })
    }

    res.json(departments)

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}

exports.updateDepartment = async (req, res) => {

  try {

    const department = await departmentService.update(
      req.params.id,
      req.body
    )

    res.json(department)

  } catch (error) {

    res.status(400).json({ error: error.message })

  }

}

exports.deleteDepartment = async (req, res) => {

  try {

    await departmentService.delete(req.params.id)

    res.json({
      message: "Departamento removido com sucesso"
    })

  } catch (error) {

    res.status(400).json({ error: error.message })

  }

}