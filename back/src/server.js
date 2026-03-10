const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const employeeRoutes = require("./routes/employee.routes");
const departmentRoutes = require("./routes/department.routes");
const positionRoutes = require("./routes/position.routes");
const userRoutes = require("./routes/user.routes");

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/employees", employeeRoutes);
app.use("/departments", departmentRoutes);
app.use("/positions", positionRoutes);
app.use("/users", userRoutes);

app.get("/employees", async (req, res) => {
  const employees = await prisma.employee.findMany();
  res.json(employees);
});

app.post("/employees", async (req, res) => {
  const employee = await prisma.employee.create({
    data: req.body
  });

  res.json(employee);
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});