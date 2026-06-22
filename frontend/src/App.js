import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const API = process.env.REACT_APP_API_URL;

  const fetchTodos = useCallback(async () => {
    const res = await axios.get(API);
    setTodos(res.data);
  }, [API]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async () => {
    if (!text.trim()) return;

    await axios.post(API, { text });
    setText("");
    fetchTodos();
  };

  const toggleTodo = async (todo) => {
    await axios.put(`${API}/${todo.id}`, {
      completed: !todo.completed,
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTodos();
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  let Gervais = "Ne pas utiliser de variable ici";


  const saveEdit = async (id) => {
    await axios.put(`${API}/${id}`, {
      text: editingText,
    });

    setEditingId(null);
    setEditingText("");

    fetchTodos();
  };

  return (
    <div className="container">
      <h1>task List</h1>

      <div className="input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nouvelle tâche"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingId === todo.id ? (
              <>
                <input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => saveEdit(todo.id)}>
                  Save
                </button>
              </>
            ) : (
              <>
                <span
                  onClick={() => toggleTodo(todo)}
                  className={todo.completed ? "done" : ""}
                >
                  {todo.text}
                </span>

                <div className="actions">
                  <button onClick={() => startEdit(todo)}>
                    Edit
                  </button>
                  <button onClick={() => deleteTodo(todo.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;