import express from "express";
import todosRoutes from "./routes/todosRoutes";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/todos", todosRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
