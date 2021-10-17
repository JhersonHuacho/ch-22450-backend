class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(nombreMascota) {
        this.mascotas.push(nombreMascota);
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(nombre, autor) {
        this.libros.push({
            nombre: nombre,
            autor: autor
        });
    }

    getBookNames() {
        return this.libros.map(libro => libro.nombre);
    }
}

const usuarioUno = new Usuario("Francisco", "Huacho", [], []);
console.log(usuarioUno.getFullName());

usuarioUno.addMascota("perro");
usuarioUno.addMascota("gato");
console.log(usuarioUno.countMascotas());

usuarioUno.addBook("El señor de los anillos", "William Golding");
usuarioUno.addBook("Fundación", "Isaac Asimov");
console.log(usuarioUno.getBookNames());


const usuarioDos = new Usuario(
    "Jherson", 
    "Huacho", 
    [
        {
            nombre: "El señor de los anillos",
            autor: "William Golding"
        },
        {
            nombre: "Fundación",
            autor: "Isaac Asimov"
        },
        {
            nombre: "Titanic",
            autor: "Jherson"
        }
    ],
    ["perro", "gato", "pato"]
);

console.log(usuarioDos.getFullName());

console.log(usuarioDos.countMascotas());

console.log(usuarioDos.getBookNames());
