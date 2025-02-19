const express = require("express");

const Todo = require("../models/todo")

const router = express.Router()

router.post("/todos", async (req, res) => {
    try {
        if (!req.body.task || req.body.task.trim() === "") {
            return res.status(400).json({ error: "Task is required" });
        }

        const newTodo = new Todo({ task: req.body.task, completed: false });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get("/todos", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.put("/todos/:id", async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { completed: req.body.completed },
            { new: true }
        );
        res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.delete("/todos/:id", async(req, res)=>{
    try{
        await Todo.findByIdAndDelete(req.params.id);
        res.json({message: "Todo deleted"});
    }catch (err){
        res.status(500).json({error: err.message});
    }
})

module.exports = router;