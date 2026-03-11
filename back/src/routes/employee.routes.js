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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de funcionários retornada com sucesso
 *       401:
 *         description: Token inválido ou não fornecido
 *       403:
 *         description: Permissão insuficiente
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
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Nome do funcionário a ser buscado
 *         schema:
 *           type: string
 *         example: João
 *     responses:
 *       200:
 *         description: Funcionários encontrados
 *       404:
 *         description: Nenhum funcionário encontrado
 *       401:
 *         description: Token inválido ou não fornecido
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
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Dados necessários para criar um funcionário
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - cpf
 *               - departmentId
 *               - positionId
 *             properties:
 *               name:
 *                 type: string
 *                 example: João da Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               cpf:
 *                 type: string
 *                 example: "12345678900"
 *               departmentId:
 *                 type: integer
 *                 example: 1
 *               positionId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Funcionário criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Permissão insuficiente
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
 *     summary: Atualiza um funcionário existente
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do funcionário
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       description: Dados para atualização do funcionário
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: João da Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               cpf:
 *                 type: string
 *                 example: "12345678900"
 *               departmentId:
 *                 type: integer
 *                 example: 1
 *               positionId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Funcionário atualizado com sucesso
 *       404:
 *         description: Funcionário não encontrado
 *       401:
 *         description: Não autorizado
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
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do funcionário a ser removido
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Funcionário removido com sucesso
 *       404:
 *         description: Funcionário não encontrado
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Permissão insuficiente
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  employeeController.deleteEmployee
)

module.exports = router