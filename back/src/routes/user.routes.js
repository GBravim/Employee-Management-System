const express = require("express")
const router = express.Router()

const userController = require("../controllers/user.controller")
const authMiddleware = require("../middleware/auth.middleware")
const roleMiddleware = require("../middleware/role.middleware")

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Users]
 */
router.post("/auth/register", userController.register)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica usuário
 *     tags: [Users]
 */
router.post("/auth/login", userController.login)

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Users]
 */
router.get(
  "/users",
  authMiddleware,
  roleMiddleware("ADMIN"),
  userController.listUsers
)

/**
 * @swagger
 * /users/email/{email}:
 *   get:
 *     summary: Busca usuário por email
 *     tags: [Users]
 */
router.get(
  "/users/email/:email",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  userController.getUserByEmail
)

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza usuário
 *     tags: [Users]
 */
router.put(
  "/users/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  userController.updateUser
)

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove usuário
 *     tags: [Users]
 */
router.delete(
  "/users/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  userController.deleteUser
)

module.exports = router