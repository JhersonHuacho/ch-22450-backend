const parseArg = require('minimist');
const yargs = require('yargs/yargs')(process.argv.slice(2));

console.log(process.argv);
console.log(parseArg(process.argv.slice(2)));

const env = parseArg(process.argv.slice(2));
console.log(env.PORT)

// const options = { default: { nomre: "Camilo", apellido: "Lindarte" } }
// console.log(parseArg(process.argv.slice(2), options));

// const options = { alias: { a: "Camilo", b: "Lindarte" } }
// console.log(parseArg(process.argv.slice(2), options));

// const options = { alias: { _: "otros", m: "modo", p: "puerto", d: "debug" } }
// let objMin = parseArg(process.argv.slice(2), options)

// delete objMin["m"]
// delete objMin["p"]
// delete objMin["d"]
// objMin["otros"] = objMin._
// delete objMin["_"]

// console.log(objMin)

