const express = require('express');
const HomeTodoController = require('../controllers/home_todo_controller');
const WebTodoController = require('../controllers/web_todo_controller');
const WebCategoryController = require('../controllers/web_category_controller');
const route = express.Router();

route.get('/home', HomeTodoController.home);

route.get('/create-todo', WebTodoController.create);
route.post('/todo', WebTodoController.store);
route.get('/todo-edit/:id', WebTodoController.edit);
route.post('/todo-update', WebTodoController.update);
route.get('/todo-delete/:id', WebTodoController.delete);

route.get('/create-category', WebCategoryController.create);
route.post('/category', WebCategoryController.store);
route.get('/category-edit/:id', WebCategoryController.edit);
route.post('/category-update', WebCategoryController.update);
route.get('/category-delete/:id', WebCategoryController.delete);

module.exports = route;