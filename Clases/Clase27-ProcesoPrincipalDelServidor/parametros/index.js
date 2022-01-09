// $ node index.js 1 2 3 4 5 6
let arguments = process.argv.splice(2);
let resultSuma = arguments.reduce((previousValue, currentValue) => {
    return Number(previousValue) + Number(currentValue)
})
console.log(process.argv)
console.log(arguments)
console.log(resultSuma)