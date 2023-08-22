import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.js";
import rosterRouter from "./routes/roster.js";
import charactersRouter from "./routes/characters.js";
import morgan from "morgan";
import User from "./models/user.js";

if (process.env.NODE_ENV !== "production") {
  // create a default admin account with credentials:
  // username: "username"
  // password: "password"
  User.register("username", "password", { admin: true });
}

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
