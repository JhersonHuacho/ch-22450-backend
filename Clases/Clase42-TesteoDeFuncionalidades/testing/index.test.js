const Todos = require("./todos");
const assert = require("assert");

describe("test para tareas", () => {
    it("Deberia crear una instancia de la clase Todos", () => {
        const todos = new Todos();
        assert.strictEqual(todos.list().length, 0);
    })

    it("Deberia adicionar tares correctamente", () => {
        const todos = new Todos();
        todos.add("One task");
        assert.strictEqual(todos.list().length, 2);
        assert.deepStrictEqual(todos.list(), [{
            title: "One task",
            complete: false
        }]);
    })
})
