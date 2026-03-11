const express = require("express")
const router = express.Router()

const positionController = require("../controllers/position.controller")
const authMiddleware = require("../middleware/auth.middleware")
const roleMiddleware = require("../middleware/role.middleware")

/**
 * @swagger
 * tags:
 *   name: Positions
 *   description: Gerenciamento de cargos
 */

/**
 * @swagger
 * /positions:
 *   get:
 *     summary: Lista todos os cargos
 *     tags: [Positions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de cargos retornada com sucesso
 *       401:
 *         description: Token inválido ou não fornecido
 *       403:
 *         description: Permissão insuficiente
 */
router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER", "VIEWER"),
  positionController.listPositions
)

/**
 * @swagger
 * /positions/name/{name}:
 *   get:
 *     summary: Busca cargos pelo nome
 *     tags: [Positions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Nome do cargo
 *         schema:
 *           type: string
 *         example: Desenvolvedor
 *     responses:
 *       200:
 *         description: Cargo(s) encontrado(s)
 *       404:
 *         description: Nenhum cargo encontrado
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.get(
  "/name/:name",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER", "VIEWER"),
  positionController.getPositionByName
)

/**
 * @swagger
 * /positions:
 *   post:
 *     summary: Cria um novo cargo
 *     tags: [Positions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Dados para criação de um cargo
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Desenvolvedor Backend
 *     responses:
 *       200:
 *         description: Cargo criado com sucesso
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
  roleMiddleware("ADMIN"),
  positionController.createPosition
)

/**
 * @swagger
 * /positions/{id}:
 *   put:
 *     summary: Atualiza um cargo
 *     tags: [Positions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do cargo
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       description: Dados para atualização do cargo
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Desenvolvedor Full Stack
 *     responses:
 *       200:
 *         description: Cargo atualizado com sucesso
 *       404:
 *         description: Cargo não encontrado
 *       401:
 *         description: Não autorizado
 */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  positionController.updatePosition
)

/**
 * @swagger
 * /positions/{id}:
 *   delete:
 *     summary: Remove um cargo
 *     tags: [Positions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do cargo a ser removido
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Cargo removido com sucesso
 *       404:
 *         description: Cargo não encontrado
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Permissão insuficiente
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  positionController.deletePosition
)

module.exports = router