/*global Vue, todoStorage */
var app = app || {};
(function () {

    'use strict';

    var filters = {
        all: function (todos) {
            return todos;
        },
        active: function (todos) {
            return todos.filter(function (todo) {
                return !todo.completed;
            });
        },
        completed: function (todos) {
            return todos.filter(function (todo) {
                return todo.completed;
            });
        }
    };

    //关闭异步模式，Vue 在检测到数据变化时同步更新 DOM
    Vue.config.async = false;
    Vue.nextTick(function(){
        console.log("Vue.nextTick",API.RENDERCOUNT);
    });

    var vueApp = new Vue({

        // the root element that will be compiled
        el: '.todoapp',
        ready:function(){
            this.counter();
        },
        // app initial state
        data: {
            todos: app.Utils.store(),
            newTodo: '',
            editedTodo: null,
            visibility: 'all',
            rendercount: API.RENDERCOUNT
        },

        // watch todos change for localStorage persistence
        watch: {
            todos: {
                deep: true,
                handler: app.Utils.store
            }
        },

        // computed properties
        // http://vuejs.org/guide/computed.html
        computed: {
            filteredTodos: function () {
                return filters[this.visibility](this.todos);
            },
            remaining: function () {
                return filters.active(this.todos).length;
            },
            allDone: {
                get: function () {
                    return this.remaining === 0;
                },
                set: function (value) {
                    this.todos.forEach(function (todo) {
                        todo.completed = value;
                    });
                }
            }
        },

        // methods that implement data logic.
        // note there's no DOM manipulation here at all.
        methods: {
            addTodo: function (text) {
                var value = text || this.newTodo && this.newTodo.trim();
                if (!value) {
                    return;
                }
                this.todos.push({ title: value, completed: false });
                this.newTodo = '';
                this.counter(); //render计数器
                
                /*this.$nextTick(function(){
                    console.log(this.rendercount);
                });*/
                
            },

            removeTodo: function (todo) {
                this.todos.$remove(todo);
                this.counter(); //render计数器
            },

            editTodo: function (todo) {
                this.beforeEditCache = todo.title;
                this.editedTodo = todo;
                this.counter(); //render计数器
            },

            doneEdit: function (todo) {
                if (!this.editedTodo) {
                    return;
                }
                this.editedTodo = null;
                todo.title = todo.title.trim();
                if (!todo.title) {
                    this.removeTodo(todo);
                }else{
                    this.counter(); //render计数器
                }
            },

            cancelEdit: function (todo) {
                this.editedTodo = null;
                todo.title = this.beforeEditCache;
                this.counter(); //render计数器
            },

            removeCompleted: function () {
                this.todos = filters.active(this.todos);
                this.counter(); //render计数器
            },
            renameTodoAtIndex: function(index,text){
                var todo = this.todos[index];
                todo.title = text;

                this.counter(); //render计数器

                return todo;
            },
            insertTodoAtIndex: function(todo, index){
                var list = this.todos;
                var len  = list.length;

                if (index >= len) {
                    list.push(todo);
                } else {
                    list.splice(index,0,todo);
                };
                this.counter(); //render计数器
                return todo;
            },
            removeTodoAtIndex: function(index){
                var todo = this.todos[index];
                this.todos.splice(index, 1);
                this.counter(); //render计数器
                return todo;
            },
            toggleTodoAtIndex: function(index){
                var todo = this.todos[index];
                todo.completed = !todo.completed;
                this.counter(); //render计数器
                return todo;
            },
            counter:function(){
                if(API.AUTORENDER){
                    this.rendercount ++;
                    API.RENDERCOUNT ++;
                }
            }
        },

        // a custom directive to wait for the DOM to be updated
        // before focusing on the input field.
        // http://vuejs.org/guide/custom-directive.html
        directives: {
            'todo-focus': function (value) {
                if (!value) {
                    return;
                }
                var el = this.el;
                Vue.nextTick(function () {
                    el.focus();
                });
            }
        }
    });

    function render() {
        if(API.FORCE_VUE_RENDER){
            API.RENDERCOUNT ++;
            vueApp.rendercount ++;
            vueApp.$set('tmp_'+API.RENDERCOUNT, 0);

            API.FORCE_VUE_RENDER = false;
        }
    }

    app.model = vueApp;
    app.render = render;

})();