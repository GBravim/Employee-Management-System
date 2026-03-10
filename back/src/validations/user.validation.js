const { z } = require("zod")

exports.createUserSchema = z.object({
  name: z.string().min(3, "Nome muito curto"),

  email: z
    .string()
    .email("Email inválido"),

  password: z
    .string()
    .min(5, "Senha precisa ter no mínimo 5 caracteres"),

  role: z
    .enum(["ADMIN", "MANAGER", "VIEWER"])
    .optional()
})