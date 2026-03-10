const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcrypt")

const prisma = new PrismaClient()

exports.create = async (data) => {

  const hashedPassword = await bcrypt.hash(data.password, 10)

  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role || "ADMIN"
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
      id: true,
      name: true,
      email: true,
      role: true
    }
  })

}