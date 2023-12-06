import express from 'express';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../controllers/todos.js';

const router = express.Router();

router.get("/api/todos", getTodos);
router.post("/api/todos", addTodo);
router.put("/api/todos/:id", updateTodo);
router.delete("/api/todos/:id", deleteTodo);

export default router;