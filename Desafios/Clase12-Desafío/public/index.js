const socket = io();

socket.on('listProducts', (data) => {
  const tbody = document.querySelector('tbody');
  const tr = document.createElement('tr');
  const tdTitle = document.createElement('td');
  const tdPrice = document.createElement('td');
  const tdUrl = document.createElement('td');
  tdTitle.innerText = data.title;
  tdPrice.innerText = data.price;
  tr.appendChild(tdTitle);
  tr.appendChild(tdPrice);

  const img = document.querySelector('img');
  img.setAttribute('src', data.thumbnail);
  tdUrl.appendChild(img);

  tr.appendChild(tdUrl);
  tbody.appendChild(tr);
});

const form = document.querySelector('.formulario');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.querySelector('#title');
  const price = document.querySelector('#price');
  const thumbnail = document.querySelector('#thumbnail');

  const objProduct = {
    title: title.value,
    price: price.value,
    thumbnail: thumbnail.value
  }

  fetch('/static/db.json')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      data.push(objProduct);
      console.log('data', data);
      socket.emit('saveProduct', objProduct);
    });

  title.value = '';
  price.value = '';
  thumbnail.value = '';
})

fetch('/static/db.json')
  .then(response => response.json())
  .then(dataJson => {
    console.log(dataJson);
    console.log(JSON.stringify(dataJson));
  });

const formChat = document.querySelector('.formulario-chat');
formChat.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputCorreo = document.querySelector('.input-correo');
  const spanValidarInputCorreo = document.querySelector('.mensaje-validacion');

  if (inputCorreo.value === '') {
    spanValidarInputCorreo.classList.remove('none');
    spanValidarInputCorreo.classList.add('block');
    return;
  } else {
    spanValidarInputCorreo.classList.remove('block');
    spanValidarInputCorreo.classList.add('none');
  }

  const inputMensaje = document.querySelector('.input-chat');
  const fechaActual = new Date();
  const fecha = `${fechaActual.toLocaleDateString()} ${fechaActual.getHours()}:${fechaActual.getMinutes()}:${fechaActual.getSeconds()}`;
  const objMensaje = {
    email: inputCorreo.value,
    fecha: fecha,
    mensaje: inputMensaje.value
  }
  inputMensaje.value = '';
  socket.emit('sendMensaje', objMensaje);
});

socket.on('listarMensajes', (data) => {
  const contentMensajes = document.querySelector('.content-mensajes');
  contentMensajes.innerHTML = '';
  data.forEach(mensaje => {
    console.log('mensaje', mensaje);
    const p = document.createElement('p');
    const spanEmail = document.createElement('span');
    const spanFecha = document.createElement('span');
    const spanMensaje = document.createElement('span');
    spanEmail.innerText = `${mensaje.email} `;
    spanEmail.style.color = 'blue';
    p.appendChild(spanEmail);

    spanFecha.innerText = `${mensaje.fecha} `;
    spanFecha.style.color = 'red';
    p.appendChild(spanFecha);

    spanMensaje.innerText = `: ${mensaje.mensaje}`;
    spanMensaje.style.color = 'green';
    p.appendChild(spanMensaje);

    contentMensajes.appendChild(p);
  });
});