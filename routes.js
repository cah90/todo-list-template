const express = require('express')
const routes = express.Router()

const TasksController = require('./controllers/TasksController')


routes.get('/tasks', TasksController.all)
routes.get('/tasks/create', TasksController.create)
routes.post('/tasks', TasksController.post)
routes.get('/tasks/edit/:id', TasksController.edit)
routes.put('/tasks', TasksController.put)
routes.delete('/tasks/delete', TasksController.delete)
routes.get('/tasks/delete/:id', TasksController.deleteLink)

module.exports = routes