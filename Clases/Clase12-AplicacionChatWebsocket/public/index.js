const socket = io();

socket.on('message_backend', (data) => {
    console.log(data);
    render(data);
    socket.emit('message_client', 'Gracias, yo soy el cliente.');
});

const render = (data) => {
    let html = data.map((x) => {
        return `
            <p><strong>${x.nombre}</strong> : ${x.msn}</p>
        `;
    }).join(' ');

    document.querySelector('#caja').innerHTML = html;
};

const addInfo = () => {
    const dataObj = {
        nombre: document.querySelector('#name').value,
        msn: document.querySelector('#msn').value
    }
    socket.emit('dataWebsocket', dataObj);
    document.querySelector('#msn').value = '';
    return false;
}