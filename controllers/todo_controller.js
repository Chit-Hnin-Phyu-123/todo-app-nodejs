
const Todo = require("../models/todo");
const ObjectId = require("mongoose").Types.ObjectId;

class TodoController{

    static async getAllTodo(req, res){
        const todos = await Todo.find().populate('category');
        res.send(todos);
    }

    static async createTodo(req, res){
        const todo = new Todo({
            category: new ObjectId(req.category.id),
            title: req.body.title,
            description: req.body.description
        });
        const isSave = await todo.save();
        if(isSave){
            res.send(todo);
        }
    }

    static async updateTodo(req, res){
        const todo = await Todo.findById(req.body.id);
        todo.category = req.body.category;
        todo.title = req.body.title;
        todo.description = req.body.description;
        const isSave = await todo.save();
        if(isSave){
            res.send(todo);
        }
    }

    static async deleteTodo(req, res){
        const todo = await Todo.findById(req.params.id);
        const isDelete = await todo.deleteOne();
        if(isDelete){
            res.send("Deleted Successfully.");
        }
    }

}

module.exports = TodoController;