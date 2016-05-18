// Public api for benchmark
API.FORCE_VUE_RENDER = false;

API.render = function(force){
    app.render(force);
    return API.RENDERCOUNT;
}

API.getModels = function(){
    return app.model;
}

API.addTodo = function(text) {
    app.model.addTodo(text);
}

// expose interface for renaming todo
API.renameTodoAtIndex = function(index,text) {
    return app.model.renameTodoAtIndex(index,text);
}

API.getTodoAtIndex = function (index){
    return app.model.todos[index];
};

API.insertTodoAtIndex = function (todo,index){
    return app.model.insertTodoAtIndex(todo,index);
};

API.removeTodoAtIndex = function (index){
    return app.model.removeTodoAtIndex(index);
};

API.clearAllTodos = function() {
    app.model.clearAll();
}

API.toggleTodoAtIndex = function(index) {
    app.model.toggleTodoAtIndex(index);
}