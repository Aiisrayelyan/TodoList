import React from "react";
import { ITodo } from "../lib/types";
import { ToDoItem } from "./ToDoItem";

interface Props {
  todos: ITodo[];
  onRemove: (id: string) => void;
  onToggle: (id: string, completed: boolean) => void;
}

export const List: React.FC<Props> = ({ todos, onRemove, onToggle }) => {
  if (!Array.isArray(todos)) {
    return <div>No todos available.</div>;
  }

  return (
    <div>
      {todos.map((todo) => (
        <ToDoItem key={todo.id} todo={todo} onRemove={onRemove} onToggle={onToggle} />
      ))}
    </div>
  );
};
