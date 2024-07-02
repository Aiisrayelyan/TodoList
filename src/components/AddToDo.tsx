import React, { useState } from "react";
import axios from "axios";
import { ITodo } from "../lib/types";

interface Props {
  onAdd: (todo: ITodo) => void;
}

export const AddToDo: React.FC<Props> = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleAdd = async () => {
    if (!text.trim()) return;

    try {
      const newTodo = { id: Date.now().toString(), text, completed: false };
      const response = await axios.post("http://localhost:3004/todos", newTodo);
      onAdd(response.data);
      setText("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a new task" />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};
