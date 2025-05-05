import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/todos")
      .then(res => setTodos(res.data))
      .catch(err => console.error("Error fetching todos:", err));
  }, []);

  const handleAdd = async () => {
    try {
      if (editId) {
        const res = await axios.put(`http://localhost:5000/api/todos/${editId}`, {
          todo,
        });
        const updatedTodos = todos.map(t =>
          t._id === editId ? res.data : t
        );
        setTodos(updatedTodos);
        setEditId(null);
      } else {
        const res = await axios.post("http://localhost:5000/api/todos", {
          todo,
          isCompleted: false,
        });
        setTodos([...todos, res.data]);
      }
      setTodo("");
    } catch (err) {
      console.error("Error saving todo:", err);
    }
  };

  const handleDelete = async (e, id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTodos(todos.filter(t => t._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEdit = (e, id) => {
    const t = todos.find(t => t._id === id);
    setTodo(t.todo);
    setEditId(id);
  };

  const handleCheckbox = async (e) => {
    const id = e.target.name;
    const index = todos.findIndex(t => t._id === id);
    const updatedTodo = { ...todos[index], isCompleted: !todos[index].isCompleted };

    try {
      const res = await axios.put(`http://localhost:5000/api/todos/${id}`, updatedTodo);
      const newTodos = [...todos];
      newTodos[index] = res.data;
      setTodos(newTodos);
    } catch (err) {
      console.error("Error updating checkbox:", err);
    }
  };

  const toggleFinished = () => setShowFinished(!showFinished);

  const handleChange = (e) => setTodo(e.target.value);

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-blue-300 min-h-[80vh]">
        <div className="addtodo my-5">
          <h2 className="text-lg font-bold">Add a todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-1/2 px-2 py-1"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6"
          >
            {editId ? "Update" : "Save"}
          </button>
        </div>

        <div className="mb-4">
          <input
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
            className="mr-2"
          />
          Show Finished
        </div>

        <h2 className="text-xl font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div>No todos to display</div>}
          {todos.map((item) => {
            if (!showFinished && item.isCompleted) return null;
            return (
              <div
                key={item._id}
                className="todo flex w-1/2 my-3 justify-between"
              >
                <input
                  name={item._id}
                  onChange={handleCheckbox}
                  type="checkbox"
                  checked={item.isCompleted}
                />
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>

                <div className="button">
                  <button
                    onClick={(e) => handleEdit(e, item._id)}
                    className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, item._id)}
                    className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App; 