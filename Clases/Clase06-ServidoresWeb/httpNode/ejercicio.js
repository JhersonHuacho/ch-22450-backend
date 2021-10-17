/**
 * 
Desarrollar un servidor en node.js que escuche peticiones en el puerto 8080 y responda un mensaje de acuerdo a la hora actual: 
Si la hora actual se encuentra entre las 6 y las 12 hs será 'Buenos días!'.
Entre las 13 y las 19 hs será 'Buenas tardes!'. 
De 20 a 5 hs será 'Buenas noches!'.

Se mostrará por consola cuando el servidor esté listo para operar y en qué puerto lo está haciendo.

 */

const http = require("http");
const moment = require("moment");

let server = http.createServer((request, response) => {
let hora = moment().format("HH");
console.log(hora);
hora = parseInt(hora);

	switch (true) {
		case (hora >= 6) && (hora <= 12):
			response.end("Buenos días!");
			break;
		case (hora >= 13) && (hora <= 19):
			response.end("Buenas tardes!");
			break;
		default:
			response.end("Buenas noches!");
			break;
	}

});

server.listen(8080, () => {
	console.log("Server run on port 8080");
});