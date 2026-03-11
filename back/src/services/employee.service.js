const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

exports.getAll = async (filters) => {

  const where = {}

  if (filters.name) {
    where.name = {
      contains: filters.name,
      mode: "insensitive"
    }
  }

  if (filters.department) {
    where.department = {
      name: {
        contains: filters.department,
        mode: "insensitive"
      }
    }
  }

  if (filters.position) {
    where.position = {
      name: {
        contains: filters.position,
        mode: "insensitive"
      }
    }
  }

  return prisma.employee.findMany({
    where,
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

exports.getByName = async (name) => {
  return prisma.employee.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive"
      }
    },
    include: {
      department: true,
      position: true
    }
  })
}

exports.update = async (id, data) => {
  return prisma.employee.update({
    where: { id: Number(id) },
    data
  })
}

exports.delete = async (id) => {
  return prisma.employee.delete({
    where: { id: Number(id) }
  })
}