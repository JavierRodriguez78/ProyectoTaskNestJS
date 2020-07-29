
const mongoose = require('mongoose');
const { Schema } = mongoose;


const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
})

module.exports = mongoose.model('task',TaskSchema);