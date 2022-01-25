const express = require('express');
const app = express();
const PORT = parseInt(process.argv[2]) || 8080;

app.get('/data', (req, res) => {
    res.send(`Servidor de express (NGINX) en el puerto ${PORT} - <stromg> PID ${process.pid} </strong>`);
})

app.listen(PORT, () => {
    console.log(`Server in running on port ${PORT} - process ${process.id}`)
});