import React from "react";
import { ITodo } from "../lib/types";
import axios from "axios";

interface Props {
  todo: ITodo;
  onRemove: (id: string) => void;
  onToggle: (id: string, completed: boolean) => void;
}

export const ToDoItem: React.FC<Props> = ({ todo, onRemove, onToggle }) => {
  const handleRemove = async () => {
    try {
      await axios.delete(`http://localhost:3004/todos/${todo.id}`);
      onRemove(todo.id);
    } catch (error) {
      console.error("Error removing todo:", error);
    }
  };

  const handleToggleDone = async () => {
    try {
      const updatedCompleted = !todo.completed;
      await axios.patch(`http://localhost:3004/todos/${todo.id}`, { completed: updatedCompleted });
      onToggle(todo.id, updatedCompleted);
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  return (
    <div className={`item ${todo.completed ? "completed" : ""}`}>
      <p>{todo.text}</p>
      <div>
        <button onClick={handleToggleDone}>done</button>
        <button onClick={handleRemove}>delete</button>
      </div>
    </div>
  );
};
