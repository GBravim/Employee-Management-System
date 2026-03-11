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
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  positionController.deletePosition
)

module.exports = router