import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [ShowFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);
  

  const saveToLS = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (params) => {
    setShowFinished(!ShowFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos); // pass the updated state
  };

  const handleDelete = (e, id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (isConfirmed) {
      let newTodos = todos.filter((item) => item.id !== id);
      setTodos(newTodos);
      saveToLS(newTodos); // pass the updated state
    } else {
    }
  };
  

  const handleAdd = () => {
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);
    setTodo("");
    saveToLS(newTodos); // ← pass updated list
  };
  

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS(newTodos); // pass the updated state
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-blue-300 min-h-[80vh] md:w-1/2">
        <h1 className="font-bold text-center text-xl">
          iTask- Manage your todos at one place
        </h1>
        <div className="addtodo my-5 flex flex-col gap-2">
          <h2 className="text-lg font-bold ">Add a todo</h2>
          <div className="flex gap-4">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-full rounded-xl px-5 py-1"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md cursor-pointer px-3"
            >
              SAVE
            </button>
          </div>
        </div>
        <input
          className="my-4"
          onChange={toggleFinished}
          type="checkbox"
          checked={ShowFinished}
        />
        Show Finished
        <div className="h-[1px] bg-black opacity-10 w-[90%] mx-auto my-2"></div>
        <h2 className="text-xl font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div>No todos to display</div>}
          {todos.map((item) => {
            return (
              (ShowFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex md:w-3/4 my-3 justify-between md "
                >
                  <div className="flex gap-3">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      id=""
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>

                  <div className="button flex h-full">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App; 