const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

exports.create = async (data) => {

  return prisma.position.create({
    data
  })

}

exports.getAll = async () => {

  return prisma.position.findMany()

}

exports.getByName = async (name) => {

  return prisma.position.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive"
      }
    }
  })

}

exports.update = async (id, data) => {

  return prisma.position.update({
    where: { id: Number(id) },
    data
  })

}

// Deletar cargo com validação relacional
exports.delete = async (id) => {

  const employeesUsingPosition = await prisma.employee.count({
    where: {
      positionId: Number(id)
    }
  })

  if (employeesUsingPosition > 0) {
    throw new Error(
      "Não é possível remover este cargo pois existem funcionários associados a ele"
    )
  }

  return prisma.position.delete({
    where: { id: Number(id) }
  })

}