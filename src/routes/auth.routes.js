import { Router } from "express";
import { login } from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router();

router.post("/login", validateSchema(login), login);

export default router;
