import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      error: "Email is not valid",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      error: "Password must be at least 6 characters",
    }),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
