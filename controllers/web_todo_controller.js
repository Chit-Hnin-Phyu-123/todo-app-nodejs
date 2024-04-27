const Todo = require('../models/todo');
const Category = require('../models/category');
const ObjectId = require("mongoose").Types.ObjectId;

class WebTodoController{
    static async create(req, res){
        const categories = await Category.find().populate('category');
        res.render('create_todo.ejs', { categories });
    }
    static async store(req, res){
        
        const todo = new Todo({
            category: new ObjectId(req.body.category),
            title: req.body.title,
            description: req.body.description,
        });

        try{
            const isSave = await todo.save();
            if(isSave){
                req.flash('success', 'created successfully.');
                res.redirect('/web/home');
            }else{
                req.flash('success', 'create fail!!!');
                res.redirect('/web/home');
            }
        }catch(e){
            req.flash('success', 'create fail!!!');
            res.redirect('/web/home');
        }
    }

    static async edit(req, res){
        const todo = await Todo.findById(req.params.id);
        res.render('edit_todo.ejs', { todo });
    }
    static async update(req, res){
        const todo = await Todo.findById(req.body.id);
        todo.category = ObjectId(req.body.category);
        todo.title = req.body.title;
        todo.description = req.body.description;
        try{
            const isSave = await todo.save();
            if(isSave){
                req.flash('success', 'updated successfully.');
                res.redirect('/web/home');
            }else{
                req.flash('success', 'update fail!!!');
            res.redirect('/web/home');
            }
        }catch(e){
            req.flash('success', 'update fail!!!');
            res.redirect('/web/home');
        }
    }
    static async delete(req, res){
        const todo = await Todo.findById(req.params.id);
        try{
            const isDelete = await todo.deleteOne();
            if(isDelete){
                req.flash('success', 'deleted successfully.');
                res.redirect('/web/home');
            }else{
                req.flash('success', 'delete fail!!!');
                res.redirect('/web/home');
            }
        }catch(e){
            req.flash('success', 'delete fail!!!');
            res.redirect('/web/home');
        }
    }
}
module.exports = WebTodoController;