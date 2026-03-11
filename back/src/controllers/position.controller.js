const positionService = require("../services/position.service")

exports.createPosition = async (req, res) => {

  try {

    const position = await positionService.create(req.body)

    res.json(position)

  } catch (error) {

    res.status(400).json({ error: error.message })

  }

}

exports.listPositions = async (req, res) => {

  const positions = await positionService.getAll()

  res.json(positions)

}

exports.getPositionByName = async (req, res) => {

  try {

    const positions = await positionService.getByName(req.params.name)

    if (positions.length === 0) {
      return res.status(404).json({
        error: "Cargo não encontrado"
      })
    }

    res.json(positions)

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}

exports.updatePosition = async (req, res) => {

  try {

    const position = await positionService.update(
      req.params.id,
      req.body
    )

    res.json(position)

  } catch (error) {

    res.status(400).json({ error: error.message })

  }

}

exports.deletePosition = async (req, res) => {

  try {

    await positionService.delete(req.params.id)

    res.json({
      message: "Cargo removido com sucesso"
    })

  } catch (error) {

    res.status(400).json({ error: error.message })

  }

}