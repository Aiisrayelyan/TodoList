import React, { useEffect, useState } from "react";
import { ITodo } from "../lib/types";
import { List } from "./List";
import { AddToDo } from "./AddToDo";
import axios from "axios";

export const ToDoList: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:3004/todos");
        if (Array.isArray(response.data)) {
          setTodos(response.data);
        } else {
          console.error("Fetched data is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const handleRemove = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggle = (id: string, completed: boolean) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed } : todo)));
  };

  const handleAdd = (todo: ITodo) => {
    setTodos([...todos, todo]);
  };

  return (
    <div className="todo-list">
      <AddToDo onAdd={handleAdd} />
      <List todos={todos} onRemove={handleRemove} onToggle={handleToggle} />
    </div>
  );
};
