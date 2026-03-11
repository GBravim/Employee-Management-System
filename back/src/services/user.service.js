const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcrypt")

const prisma = new PrismaClient()

exports.create = async (data) => {

  const existingUser = await prisma.user.findUnique({
    where: { email: data.email }
  })

  if (existingUser) {
    throw new Error("Email já está em uso")
  }

  const hashedPassword = await bcrypt.hash(data.password, 10)

  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role
    }
  })

}

exports.findByEmail = async (email) => {

  return prisma.user.findUnique({
    where: { email }
  })

}

exports.getAll = async () => {

  return prisma.user.findMany({
    select: {
      name: true,
      id: true,
      email: true,
      role: true
    }
  })

}

exports.getById = async (id) => {

  return prisma.user.findUnique({
    where: { id: Number(id) },
    select: {
      name: true,
      id: true,
      email: true,
      role: true
    }
  })

}

exports.getByEmail = async (email) => {

  return prisma.user.findUnique({
    where: { email },
    select: {
      name: true,
      id: true,
      email: true,
      role: true
    }
  })

}

exports.update = async (id, data) => {

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10)
  }

  return prisma.user.update({
    where: { id: Number(id) },
    data
  })

}

exports.delete = async (id) => {

  return prisma.user.delete({
    where: { id: Number(id) }
  })

}