import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.js";
import rosterRouter from "./routes/roster.js";
import charactersRouter from "./routes/characters.js";
import morgan from "morgan";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Logging
app.use(morgan(":status :method :url :response-time[2] ms"));

app.use("/", authRouter);
app.use("/api", rosterRouter);
app.use("/api", charactersRouter);

export default app;
