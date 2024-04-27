const Todo = require('../models/todo');

class HomeTodoController {
    static async home(req, res) {
        try {
            const todos = await Todo.find().populate('category');
            res.render('home.ejs', { todos, message: req.flash('success') });
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = HomeTodoController;
