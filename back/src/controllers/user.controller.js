const userService = require("../services/user.service")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { createUserSchema } = require("../validations/user.validation")

const SECRET = "descomplica"

exports.register = async (req, res) => {

  try {

    const data = createUserSchema.parse(req.body)

    const user = await userService.create(data)

    res.json(user)

  } catch (error) {

    res.status(400).json({ error: error.message })

  }

}

exports.login = async (req, res) => {

  try {

    const { email, password } = req.body

    const user = await userService.findByEmail(email)

    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" })
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      return res.status(401).json({ error: "Senha inválida" })
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      SECRET,
      { expiresIn: "8h" }
    )

    res.json({ token })

  } catch (error) {

    res.status(500).json({ error: error.message })

  }
}

exports.listUsers = async (req, res) => {

  const users = await userService.getAll()

  res.json(users)

}

exports.getUserByEmail = async (req, res) => {

  try {

    const user = await userService.getByEmail(req.params.email)

    if (!user) {
      return res.status(404).json({
        error: "Usuário não encontrado"
      })
    }

    res.json(user)

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}

exports.updateUser = async (req, res) => {

  try {

    const user = await userService.update(
      req.params.id,
      req.body
    )

    res.json(user)

  } catch (error) {

    res.status(400).json({ error: error.message })

  }

}

exports.deleteUser = async (req, res) => {

  try {

    await userService.delete(req.params.id)

    res.json({
      message: "Usuário removido com sucesso"
    })

  } catch (error) {

    res.status(400).json({ error: error.message })

  }

}