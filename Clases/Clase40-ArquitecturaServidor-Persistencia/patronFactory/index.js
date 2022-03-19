class Empleados {
    speak() {
        return 'Hola soy un empleado.' + this.type;
    }
}

class FullTime extends Empleados {
    constructor() {
        super();
        this.type = "Full Time"
    }
}

class PartTime extends Empleados {
    constructor() {
        super();
        this.type = "Part Time"
    }
}

class ContractoTime extends Empleados {
    constructor() {
        super();
        this.type = "Contracto Time"
    }
}

class MisEmpleados {
    crearEmpleado(data) {
        if (data.type === "fullTime") return new FullTime();
        if (data.type === "partTime") return new PartTime();
        if (data.type === "contractor") return new ContractoTime();
    }
}

let empresa = new MisEmpleados();
let type = ["fullTime", "partTime", "contractor"];
let empleados = [];

for (let i = 0; i <= 10; i++) {
    empleados.push(empresa.crearEmpleado({ type: type[Math.floor(Math.random(3) * 3)] }));
}

// console.log(empleados);

empleados.forEach(x => {
    console.log(x.speak());
});
