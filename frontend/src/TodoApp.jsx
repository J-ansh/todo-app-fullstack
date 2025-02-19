import { useState, useEffect } from "react"
import { getTodos, addTodo, deleteTodo, toggleTodo } from "./utils/api"

function TodoApp(){
    const [task, setTask] = useState("");
    const [todos, setTodos] = useState([]);

    // Define fetchTodos so it can be used anywhere in the component
    const fetchTodos = async () => {
        try {
            const todos = await getTodos();
            setTodos(todos);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    useEffect(() => {
        fetchTodos(); // Fetch todos when the component mounts
    }, []);

    const handleAddTodo = async () => {
    
        if (!task.trim()) {
            console.warn("Task input is empty, not adding.");
            return;
        }
    
        await addTodo(task);  
        fetchTodos(); 
        setTask("");  
    };
    
    const handleDeleteTodo = async(id)=>{
        try{
            await deleteTodo(id);
            fetchTodos(); // Re-fetch todos after deletion
        } catch(err) {
            console.error("Error deleting todo", err)
        }
    }

    const handleToggle = async (id, completed) => {
        try {
            
            await toggleTodo(id, !completed); 
            
            setTodos(prevTodos =>
                prevTodos.map(todo =>
                    todo._id === id ? { ...todo, completed: !completed } : todo
                )
            );
        } catch (error) {
            console.error("Error toggling todo:", error);
        }
    };
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">
                    Todo App
                </h1>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <input
                        type="text"
                        value={task}
                        onChange={(e)=> setTask(e.target.value)}
                        className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter a task"
                    />
                    <button 
                        onClick={handleAddTodo} 
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        Add
                    </button>
                </div>
                <ul className="mt-4 space-y-2">
                    {todos.length === 0 ? (
                        <div className="text-gray-500 text-center">No tasks added yet</div>
                    ) : (
                        todos.map((todo) => (
                            <li key={todo._id} className="flex items-center justify-between bg-gray-200 p-2 rounded-md">
                                <div className="flex items-center">
                                    <input 
                                        type="checkbox" 
                                        checked={todo.completed} 
                                        onChange={()=> handleToggle(todo._id, todo.completed)} 
                                        className="mr-2"
                                    />
                                    <span className={`text-lg ${
                                        todo.completed ? "line-through text-gray-500" : "text-gray-800"
                                    }`}>
                                        {todo.task}
                                    </span>
                                </div>
                                <button 
                                    onClick={()=> handleDeleteTodo(todo._id)} 
                                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                                    Delete
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    )
}

export default TodoApp;
