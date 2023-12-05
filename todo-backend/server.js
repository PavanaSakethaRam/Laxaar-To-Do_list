const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

app.get("/api/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/todos", async (req, res) => {
  const { title, description } = req.body;

  try {
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }
    const newTodo = new Todo({
      title,
      description,
      completed: false,
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error adding todo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/api/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/api/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Todo.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
