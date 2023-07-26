import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.js";

const app = express();

app.use(cors({ //without these params I was getting CORS errors
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);

export default app;
