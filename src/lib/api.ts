import axios from "axios";
import { ITodo } from "./types";

const URL = "http://localhost:3004/todos"

export const getAllTodos = async (): Promise<ITodo[]> => {
    const response = await axios.get(URL);
    return response.data
}

type InputTodo = Omit<ITodo, 'id'>

export const addToDo = async(obj:InputTodo):Promise<ITodo> => {
    const response = await axios.post(URL, obj)
    return response.data
}