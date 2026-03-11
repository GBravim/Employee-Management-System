const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

exports.create = async (data) => {
  return prisma.department.create({ data })
}

exports.getAll = async () => {
  return prisma.department.findMany()
}

exports.getByName = async (name) => {

  return prisma.department.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive"
      }
    }
  })

}

exports.update = async (id, data) => {
  return prisma.department.update({
    where: { id: Number(id) },
    data
  })
}

exports.delete = async (id) => {
  return prisma.department.delete({
    where: { id: Number(id) }
  })
}