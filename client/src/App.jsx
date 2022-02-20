import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoList from './components/todo-list/TodoList';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  // Run this function once, when the component is created
  // Make sure to run this before saving, as otherwise we will save an empty list of todos!
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  // Run this function every time the todos change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id) => {
    // Never directly modify a variable!
    const newTodos = [...todos];
    const selectedTodo = newTodos.find((todo) => todo.id === id);
    selectedTodo.complete = !selectedTodo.complete;
    setTodos(newTodos);
  };

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === '') return;

    setTodos((previous) => {
      return [
        ...previous,
        {
          id: uuidv4(),
          name,
          complete: false,
        },
      ];
    });

    // Clear input after inserting todo element
    todoNameRef.current.value = null;
  }

  function handleClearTodos(e) {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
    const test = 1;
    test = 2;

    const m = test + 4;
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input type="text" ref={todoNameRef} />
      <button type="button" onClick={handleAddTodo}>
        Add New Todo
      </button>
      <button type="button" onClick={handleClearTodos}>
        Clear Completed Todos
      </button>
      <div>{todos.filter((todo) => !todo.complete).length} left todo</div>
    </>
  );
}

export default App;
