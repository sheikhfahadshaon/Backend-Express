const { z } = require('zod');

const signUpSchema = z.object({
  phone: z.string(),
  password: z.string(),
  name: z.string(),
  university: z.string(),
  District: z.string(),
});

const loginSchema = z.object({
  phone: z.string(),
  password: z.string(),
})

const updateSchema = z.object({
  name: z.string(),
  university: z.string(),
  District: z.string(),
})

const updatePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
});


module.exports = { signUpSchema, loginSchema, updateSchema, updatePasswordSchema }