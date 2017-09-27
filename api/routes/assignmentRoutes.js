'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/assignmentController');

  // todoList Routes
  app.route('/')
    .get(todoList.list_all_tasks);

app.route('/addRequest')
    .post(todoList.addRequest); 

app.route('/getAllRequests')
	.get(todoList.getAllRequests); 
};