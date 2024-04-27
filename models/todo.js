const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
});

const Todo = mongoose.model('todo', TodoSchema);
module.exports = Todo;
