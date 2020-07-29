const mongoose = require('mongoose');

const Task = require('./task.schema');

mongoose.connect("mongodb+srv://xavi:xavi78@cluster0.dtzfi.mongodb.net/Prueba?retryWrites=true&w=majority", {useNewUrlParser: true})

module.exports = {
    Task
}