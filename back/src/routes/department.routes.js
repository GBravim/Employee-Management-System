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
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  departmentController.deleteDepartment
)

module.exports = router