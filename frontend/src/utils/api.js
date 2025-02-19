import axios from "axios"

const BASE_URL = "http://localhost:3000/api";
const api = axios.create({
    baseURL: BASE_URL,
    headers:{
        "Content-Type": "application/json"
    }
})

export const getTodos = async () => {
    try {
        const response = await api.get("/todos");
        return response.data;
    } catch (error) {
        console.error("Error fetching todos:", error);
        return [];
    }
};

export const addTodo = async (task) => {
    try {
        const response = await api.post("/todos", { task });  
        return response.data; 
    } catch (error) {
        console.error("Error adding todo:", error.response?.data || error.message);
    }
};



export const deleteTodo = async(id)=>{
    await api.delete(`/todos/${id}`)
}

export const toggleTodo = async(id, completed)=>{
    const response = await api.put(`/todos/${id}`, { completed });
    return response.data
}