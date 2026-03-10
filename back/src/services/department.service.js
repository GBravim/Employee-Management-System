const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

exports.getAll = async () => {
  return prisma.department.findMany()
}

exports.create = async (data) => {
  return prisma.department.create({
    data
  })
}