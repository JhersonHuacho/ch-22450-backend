const socket = io();

const render = (data) => {
  let html = data.map((x) => {
    return `<p>${x.user} : ${x.msn}<p>`;
  }).join(" ");

  console.log('html', html);
  console.log(typeof html);

  document.querySelector('#caja').innerHTML = html;
}

socket.on('message_client', (data)=> {
  console.log('data', data);
  render(data);
  socket.emit('message_backend', 'Gracias por el mensaje');
});

const addMessage = () => {
  console.log("me active");
  let objMsn = {
    user: Math.random(),
    msn: document.querySelector('#msn').value
  };

  socket.emit('msn_client', objMsn);
  document.querySelector('#msn').value = '';
  return false;
}