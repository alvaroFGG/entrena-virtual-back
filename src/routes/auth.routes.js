import { Router } from "express";
import { login, verifyToken } from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/login", validateSchema(loginSchema), login);
router.get("/verify", verifyToken);

export default router;
