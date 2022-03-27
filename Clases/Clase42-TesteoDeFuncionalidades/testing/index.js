const Todos = require("./todos");

const todos = new Todos();

console.log(todos.list());

todos.add("One task");
console.log(todos.list());

todos.add("Two task");
console.log(todos.list());

todos.add("Three task");
console.log(todos.list());

todos.complete("One task");
console.log(todos.list());