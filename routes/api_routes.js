const express = require('express');
const TodoController = require('../controllers/todo_controller');
const CategoryController = require('../controllers/category_controller');
const route = express.Router();

route.get('/categories', CategoryController.getAllCategory);
route.post('/category', CategoryController.createCategory);
route.put('/category', CategoryController.updateCategory);
route.delete('/category/:id', CategoryController.deleteCategory);

route.get('/todos', TodoController.getAllTodo);
route.post('/todo', TodoController.createTodo);
route.put('/todo', TodoController.updateTodo);
route.delete('/todo/:id', TodoController.deleteTodo);

module.exports = route;