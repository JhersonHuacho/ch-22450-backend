const util = require('util');
function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true))
}
let original = [
    {
        text: 'hola fran',
        fecha: '12/27/2021 8:52:14',
        author: {
            alias: 'pepito',
            avatar: 'kmkemkm',
            apellido: 'huacho',
            id: 'jhersonhuacho@gmail.com',
            edad: '32',
            nombre: 'FranciscoJherson'
        }
    },
    {
        text: 'hola jherson',
        fecha: '12/27/2021 8:52:14',
        author: {
            alias: 'pepito',
            avatar: 'kmkemkm',
            apellido: 'huacho',
            id: 'jhersonhuacho@gmail.com',
            edad: '32',
            nombre: 'FranciscoJherson'
        }
    }
]
let data = {
    id: "mensaje",
    mensaje: original
}
console.log(data)
// print(data)