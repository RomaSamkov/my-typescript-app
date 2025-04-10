import express from "express";
import cors from "cors";
import { connectDB } from "./config/connectDB";
import todosRoutes from "./routes/todosRoutes";
import notesRoutes from "./routes/notesRoutes";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api/notebook/todos", todosRoutes);
app.use("/api/notebook/notes", notesRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
