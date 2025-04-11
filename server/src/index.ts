import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/connectDB";
import todosRoutes from "./routes/todosRoutes";
import notesRoutes from "./routes/notesRoutes";
import authRoutes from "./routes/authRoutes";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/notebook/todos", todosRoutes);
app.use("/api/notebook/notes", notesRoutes);
app.use("/api/notebook/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
