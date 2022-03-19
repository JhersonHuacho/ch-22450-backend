// PATRON SINGLETON
// Nos pemite instanciar una clase, una unica vez.

const SingletonClass = require("./singleton");

const obj1 = SingletonClass.getInstance();
const obj2 = SingletonClass.getInstance();
const obj3 = SingletonClass.getInstance();
const obj4 = SingletonClass.getInstance();

console.log(obj1);
console.log(obj2);
console.log(obj3);
console.log(obj4);