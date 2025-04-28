import { useState } from "react";
import "./styles.css";

export default function App() {
  const [inputValue, setInputValue]: any = useState("");
  const [todoList, setTodoList]: any = useState([]);
  const [editMode, setEditMode]: any = useState(false);
  const [currentTodo, setCurrentTodo]: any = useState(null);

  const addList = () => {
    if (inputValue.trim() === "") return;
    console.log(todoList);

    if (editMode && currentTodo) {
      setTodoList((prevList) =>
        prevList.map((todo) =>
          todo.id === currentTodo.id ? { ...todo, value: inputValue } : todo
        )
      );
      setEditMode(false);
      setCurrentTodo(null);
    } else {
      setTodoList((prevList: any) => [
        ...prevList,
        {
          id: prevList.length + 1,
          value: inputValue,
        },
      ]);
    }

    setInputValue("");
  };

  const handleInput = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleDelete = (id) => {
    setTodoList((prevList) => {
      return prevList.filter((val) => val.id !== id);
    });
  };

  const handleEdit = (todo: any) => {
    setEditMode(true);
    setInputValue(todo.value);
    setCurrentTodo(todo);
  };

  const cancelEdit = () => {
    setEditMode(false);
    setInputValue("");
    setCurrentTodo(null);
  };

  return (
    <>
      <div>Todo List</div>
      <div>
        <input type="text" value={inputValue} onChange={handleInput} />
        <label htmlFor="input"></label>
        <button onClick={addList}>{editMode ? "Update" : "Add"}</button>
        {editMode && <button onClick={cancelEdit}> cancel</button>}
      </div>

      <div className="todo-list">
        {todoList.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Index</th>
                <th>Task</th>
                <th>Crud Op</th>
              </tr>
            </thead>
            <tbody>
              {todoList.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.value}</td>
                  <td>
                    <button onClick={() => handleEdit(todo)}>Edit</button>
                    <button onClick={() => handleDelete(todo.id)}>
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No tasks yet. Add a task to get started!</p>
        )}
      </div>
    </>
  );
}
