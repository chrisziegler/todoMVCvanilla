// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html



var todoList = {
        todos: [],

        addTodo: function(todoText) {

            this.todos.push({
                todoText: todoText,
                completed: false
            });
        },

        changeTodo: function(position, todoText) {
            this.todos[position].todoText = todoText;
        },

        deleteTodo: function(position) {
            this.removedTodo = this.todos[position].todoText;
            this.todos.splice(position, 1);
        },

        toggleCompleted: function(position) {
            var todo = this.todos[position];
            todo.completed = !todo.completed;
        },

        toggleAll: function() {
            var completedTodos = 0;
            var totalTodos = this.todos.length;

            this.todos.forEach(function(todo) {
                if (todo.completed) {
                    completedTodos++
                }
            });
            // COMBINE IF ELSE LOGIC INTO ONE FOREACH USING TERNARY

            this.todos.forEach(function(todo) {
              if (totalTodos === completedTodos ? todo.completed = false : todo.completed = true);
            });
        }
      }; // end todoList object



        var handlers = {

            toggleAll: function() {
                todoList.toggleAll();
                view.displayTodos();
            },
            addTodo: function() {
                var addTodoTextInput = document.getElementById('addTodoTextInput');
                todoList.addTodo(addTodoTextInput.value);
                addTodoTextInput.value = '';
                view.displayTodos();
            },
            changeTodo: function() {
                var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
                var changeTodoTextInput = document.getElementById('changeTodoTextInput');
                todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
                changeTodoPositionInput.value = '';
                changeTodoTextInput.value = '';
                view.displayTodos();
            },
            deleteTodo: function(position) {
                todoList.deleteTodo(position);
                view.displayTodos();
            },
            toggleCompleted: function() {
                var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
                todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
                toggleCompletedPositionInput.value = '';
                view.displayTodos();
            }
        };

        var view = {
            displayTodos: function() {
                var todosUl = document.querySelector('ul'),
                    fragment = document.createDocumentFragment(),
                    todoTextWithCompletion = '',
                    todoLi;
                todosUl.innerHTML = '';

                // for (var i = 0, len = todoList.todos.length; i < len; i++) {
                //     todoLi = document.createElement('li');
                //     var todo = todoList.todos[i];

                //Create a li element for each todo using forEach
                var self = this;
                todoList.todos.forEach(function(todo, position){
                     todoLi = document.createElement('li');

                     if (todo.completed === true) {
                         todoTextWithCompletion = '(x) ' + todo.todoText + ' ';
                     } else {
                         todoTextWithCompletion = '(   ) ' + todo.todoText + ' ';
                     }
                     todoLi.id = position;
                     todoLi.innerText = todoTextWithCompletion;
                     todoLi.appendChild(self.createDeleteButton());
                     fragment.appendChild(todoLi);

                });

                    // if (todo.completed === true) {
                    //     todoTextWithCompletion = '(x) ' + todo.todoText + ' ';
                    // } else {
                    //     todoTextWithCompletion = '(   ) ' + todo.todoText + ' ';
                    // }
                    // todoLi.id = i;
                    // todoLi.innerText = todoTextWithCompletion;
                    // todoLi.appendChild(this.createDeleteButton());
                    // fragment.appendChild(todoLi);

              //  }  end for loop
                todosUl.appendChild(fragment);
            },
            // moved to a seperate method for clarity
            // we want to create a DOM button element and return it
            createDeleteButton: function() {
                var deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                //need way to access these elements, but id's only work for unique elements
                deleteButton.className = 'deleteButton';
                return deleteButton;
            },
            setUpEventListeners: function() {
                var todosUl = document.querySelector('ul');
                todosUl.addEventListener('click', function(event) {
                    var elementClicked = event.target;
                    if (elementClicked.className === 'deleteButton') {
                        handlers.deleteTodo(parseInt(elementClicked.parentNode.id, 10));
                    }
                });
            }
        };  // end View object

        view.setUpEventListeners();

        // var todosUl = document.querySelector('ul');
        // todosUl.addEventListener('click', function(event) {
        //   var elementClicked = event.target;
        //   if (elementClicked.className === 'deleteButton'){
        //     handlers.deleteTodo(parseInt(elementClicked.parentNode.id, 10));
        //   }
        // });
