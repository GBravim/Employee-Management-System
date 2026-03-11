const express = require("express")
const router = express.Router()

const employeeController = require("../controllers/employee.controller")
const authMiddleware = require("../middleware/auth.middleware")
const roleMiddleware = require("../middleware/role.middleware")

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Gerenciamento de funcionários
 */

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Lista todos os funcionários
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: Lista de funcionários
 */
router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER", "VIEWER"),
  employeeController.listEmployees
)

/**
 * @swagger
 * /employees/name/{name}:
 *   get:
 *     summary: Busca funcionários pelo nome
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Funcionários encontrados
 *       404:
 *         description: Nenhum funcionário encontrado
 */
router.get(
  "/name/:name",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER", "VIEWER"),
  employeeController.getEmployeeByName
)

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Cria um novo funcionário
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               cpf:
 *                 type: string
 *               departmentId:
 *                 type: integer
 *               positionId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Funcionário criado
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  employeeController.createEmployee
)

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Atualiza um funcionário
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               departmentId:
 *                 type: integer
 *               positionId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Funcionário atualizado
 */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  employeeController.updateEmployee
)

/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     summary: Remove um funcionário
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Funcionário removido
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  employeeController.deleteEmployee
)

module.exports = router