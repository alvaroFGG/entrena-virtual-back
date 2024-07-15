import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import { FRONTEND_URL } from "./config.js";
import cors from "cors";

const app = express();

app.use(morgan("dev"));
app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

export default app;
