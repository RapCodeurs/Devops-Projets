const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let todos = [];

/* GET all todos */
app.get("/todos", (req, res) => {
  res.json(todos);
});

/* CREATE todo */
app.post("/todos", (req, res) => {
  const todo = {
    id: Date.now(),
    text: req.body.text,
    completed: false,
  };

  todos.push(todo);
  res.status(201).json(todo);
});

/* TOGGLE completed + UPDATE text */
app.put("/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  todos = todos.map((todo) =>
    todo.id === id
      ? {
          ...todo,
          text: req.body.text ?? todo.text,
          completed:
            req.body.completed !== undefined
              ? req.body.completed
              : todo.completed,
        }
      : todo
  );

  res.json({ message: "Todo updated" });
});

/* DELETE todo */
app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  todos = todos.filter((todo) => todo.id !== id);

  res.json({ message: "Todo deleted" });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Changement - Serveur tourne sur http://localhost:${PORT}`);
});