const calculo = () => {
    let suma = 0;
    for (let i = 0; i <= 5e9; i++) {
        suma += i;
    }
}

process.on('message', (message) => {
    if (message === 'start') {
        let suma = calculo();
        process.send(suma);
    } else {
        console.log('NO inicio la función')
    }
})