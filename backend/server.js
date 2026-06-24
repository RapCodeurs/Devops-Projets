const express = require('express');
const cors = require('cors');
const fs = require('fs'); // <-- AJOUT : Pour lire et écrire dans un fichier
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

const FILE_PATH = path.join(__dirname, 'todos.json');

// Fonction utilitaire pour lire le fichier JSON de manière sécurisée
const readTodosFromFile = () => {
  try {
    if (!fs.existsSync(FILE_PATH)) {
      return [];
    }
    const data = fs.readFileSync(FILE_PATH, 'utf8');
    return JSON.parse(data || '[]');
  } catch (error) {
    return [];
  }
};

// Fonction utilitaire pour écrire dans le fichier JSON
const writeTodosToFile = (todos) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2), 'utf8');
};


/* GET all todos */
app.get('/todos', (req, res) => {
  const todos = readTodosFromFile(); // Récupère les données à jour
  res.json(todos);
});

/* CREATE todo */
app.post('/todos', (req, res) => {
  const todos = readTodosFromFile();
  
  const todo = {
    id: Date.now(),
    text: req.body.text,
    completed: false,
  };

  todos.push(todo);
  writeTodosToFile(todos); // Sauvegarde physique
  
  res.status(201).json(todo);
});

/* TOGGLE completed + UPDATE text */
app.put('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  let todos = readTodosFromFile();

  todos = todos.map((todo) =>
    todo.id === id
      ? {
          ...todo,
          text: req.body.text !== undefined ? req.body.text : todo.text,
          completed: req.body.completed !== undefined ? req.body.completed : todo.completed,
        }
      : todo,
  );

  writeTodosToFile(todos); // Sauvegarde physique
  res.json({ message: 'Todo updated' });
});

/* DELETE todo */
app.delete('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  let todos = readTodosFromFile();

  todos = todos.filter((todo) => todo.id !== id);

  writeTodosToFile(todos); // Sauvegarde physique
  res.json({ message: 'Todo deleted' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur tourne sur http://localhost:${PORT}`);
});
