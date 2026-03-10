const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

exports.getAll = async () => {
  return prisma.employee.findMany({
    include: {
      department: true,
      position: true
    }
  })
}

exports.create = async (data) => {
  return prisma.employee.create({
    data
  })
}