let params = process.argv.slice(2);

console.log(params);

/**
 * Crear un script de node js que nos permite calcular la suma, 
 * resta multiplicacion, división y  
 * módulo de dos números que se pasan como argumento del script.
 */
// const a = parseInt(params[0]);
// const b = parseInt(params[1]);

const a = +params[0];
const b = +params[1];

const suma = (a,b) => a + b; 
const resta = (a,b) => a - b; 
const multiplicacion = (a,b) => a * b; 
const division = (a,b) => a / b; 
const modulo = (a,b) => a % b;

console.log(suma(a,b));
console.log(resta(a,b));
console.log(multiplicacion(a,b));
console.log(division(a,b));
console.log(modulo(a,b));

/**
 * para parsear tambien se puede utilizar el simbolo "+" para convertir a number "const a = +params[0];" que es igual a "const a = parseInt(params[0]);"
 */