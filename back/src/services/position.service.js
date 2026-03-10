const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

exports.getAll = async () => {
  return prisma.position.findMany()
}

exports.create = async (data) => {
  return prisma.position.create({
    data
  })
}