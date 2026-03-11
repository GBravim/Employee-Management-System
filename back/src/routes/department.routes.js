const express = require("express")
const router = express.Router()

const departmentController = require("../controllers/department.controller")
const authMiddleware = require("../middleware/auth.middleware")
const roleMiddleware = require("../middleware/role.middleware")

/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: Gerenciamento de departamentos
 */

/**
 * @swagger
 * /departments:
 *   get:
 *     summary: Lista todos os departamentos
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de departamentos retornada com sucesso
 *       401:
 *         description: Token inválido ou não fornecido
 *       403:
 *         description: Permissão insuficiente
 */
router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER", "VIEWER"),
  departmentController.listDepartments
)

/**
 * @swagger
 * /departments/name/{name}:
 *   get:
 *     summary: Busca departamentos pelo nome
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Nome do departamento
 *         schema:
 *           type: string
 *         example: Recursos Humanos
 *     responses:
 *       200:
 *         description: Departamento(s) encontrado(s)
 *       404:
 *         description: Nenhum departamento encontrado
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.get(
  "/name/:name",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER", "VIEWER"),
  departmentController.getDepartmentByName
)

/**
 * @swagger
 * /departments:
 *   post:
 *     summary: Cria um novo departamento
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Dados para criação de um departamento
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Tecnologia da Informação
 *     responses:
 *       200:
 *         description: Departamento criado com sucesso
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
  departmentController.createDepartment
)

/**
 * @swagger
 * /departments/{id}:
 *   put:
 *     summary: Atualiza um departamento
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do departamento
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       description: Dados para atualização do departamento
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Tecnologia
 *     responses:
 *       200:
 *         description: Departamento atualizado com sucesso
 *       404:
 *         description: Departamento não encontrado
 *       401:
 *         description: Não autorizado
 */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  departmentController.updateDepartment
)

/**
 * @swagger
 * /departments/{id}:
 *   delete:
 *     summary: Remove um departamento
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do departamento a ser removido
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Departamento removido com sucesso
 *       404:
 *         description: Departamento não encontrado
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Permissão insuficiente
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  departmentController.deleteDepartment
)

module.exports = router