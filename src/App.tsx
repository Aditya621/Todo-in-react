import { useState } from "react";
import "./styles.css";

export default function App() {
  const [inputValue, setInputValue]: any = useState("");
  const [todoList, setTodoList]: any = useState([]);
  const [editMode, setEditMode]: any = useState(false);
  const [currentTodo, setCurrentTodo]: any = useState(null);
  const [sortCompleted, setsortCompleted] = useState(false)

  const addList = () => {
    if (inputValue.trim() === "") return;

    if (editMode && currentTodo) {
      setTodoList((prevList: any) =>
        prevList.map((todo: any) =>
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
          checked: false
        },
      ]);
    }

    setInputValue("");
  };

  const handleInput = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleDelete = (id: any) => {
    setTodoList((prevList: any) => {
      return prevList.filter((val: any) => val.id !== id);
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

  const handleCheckbox = (id:any) => {
    setTodoList((prevList:any) => prevList.map((todo:any) => todo.id === id ? {
      ...todo,
      checked: !todo.checked
    } : todo))    
  }

  const toggleSorting = () => {
    setsortCompleted(prev => !prev);
  }

  const getSortedTodos = () => {
    if(sortCompleted){
      return [...todoList].sort((a,b) => {
        if(a.checked === b.checked) return 0;
        return a.checked ? 1 : -1;
      })
    } 

    return todoList;
  }

  return (
    <>
      <div>Todo List</div>
      <div>
        <input type="text" value={inputValue} onChange={handleInput} />
        <label htmlFor="input"></label>
        <button onClick={addList}>{editMode ? "Update" : "Add"}</button>
        {editMode && <button onClick={cancelEdit}> cancel</button>}
      </div>

      <div className="todo-options">
        <label>
          <input 
            type="checkbox" 
            checked={sortCompleted} 
            onChange={toggleSorting} 
          />
          Sort incomplete tasks first
        </label>
      </div>

      <div className="todo-list">
        {todoList.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Checkbox</th>
                <th>Index</th>
                <th>Task</th>
                <th>Crud Op</th>
              </tr>
            </thead>
            <tbody>
              {getSortedTodos().map((todo: any) => (
                <tr key={todo.id}>
                  <input type="checkbox" value={todo.checked} onChange={() => handleCheckbox(todo.id)}/>
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
          <p>Add Today Tasks :)</p>
        )}
      </div>
    </>
  );
}
