const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcrypt")

const prisma = new PrismaClient()

async function main() {

  const password = await bcrypt.hash("Admin@123", 10)

  await prisma.user.create({
    data: {
      name: "ADMIN",
      email: "admin@admin.com",
      password,
      role: "ADMIN"
    }
  })

  await prisma.department.createMany({
    data: [
      { name: "Financeiro" },
      { name: "RH" },
      { name: "TI" }
    ]
  })

  await prisma.position.createMany({
    data: [
      { title: "Gerente" },
      { title: "Analista" },
      { title: "Estagiário" }
    ]
  })

}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())