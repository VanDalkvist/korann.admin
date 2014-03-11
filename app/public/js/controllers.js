'use strict';


function IndexCtrl($scope, $http) {
}

function LoginCtrl($scope, $http, $rootScope, $location) {
    $scope.user = {};
    $scope.statusMessage = '';

    //figure out where we should redirect to once the user has logged in.
    if (!$rootScope.redirect || $rootScope.redirect == '/login') {
        $rootScope.redirect = '/todos';
    }

    $scope.submit = function (user) {
        $http.post('/user/login', $scope.user)
            .success(function (data) {
                $rootScope.user.username = $scope.user.username;
                $location.path($rootScope.redirect);
            })
            .error(function (data, status, headers, config) {
                $scope.statusMessage = data;
            });
    }
}

function TodosCtrl($scope, $http, Todo) {

    //get the todos from server
    getTodosFromServer()

    $scope.newTodo = {};

    $scope.createTodo = function (todo) {
        if ($scope.newTodoForm.$invalid) {
            return;
        }
        Todo.save({}, $scope.newTodo,
            function (data) {
                $scope.todos.push(data);
                $scope.statusMessage = '';
                $scope.newTodo = {};

            },
            function (data, status, headers, config) {
                $scope.statusMessage = data;
            });
    }

    $scope.markComplete = function (todo) {
        todo.$save({id: todo._id});
    }

    //remove complete todos
    $scope.removeComplete = function () {
        $scope.todos.forEach(function (todo) {
            if (todo.complete) {
                todo.$delete({id: todo._id}, function () {                    //delete on server
                    $scope.todos.splice($scope.todos.indexOf(todo), 1);   //remove from client
                });
            }
        })
    }

    function getTodosFromServer() {
        Todo.query(function (data) {
            $scope.todos = data;
        });
    }

}

