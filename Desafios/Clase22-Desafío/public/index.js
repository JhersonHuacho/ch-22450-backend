const socket = io();

// Normalización
const authorSchema = new normalizr.schema.Entity('author', {}, { idAttribute: "id" });
// const textSchema = new schema.Entity('text');
const postSchema = new normalizr.schema.Entity('post',
  { author: authorSchema },
  { idAttribute: "id" }
);
const postsSchema = new normalizr.schema.Entity('posts',
  { posts: [postSchema] },
  { idAttribute: "id" }
);

const listProductsHtml = ((data) => {
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

  fetch('/api/productos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(objProduct)
  })
    .then(response => response.json())
    .then(data => {
      console.log('data => ', data);
      listProductsHtml(data);
    });

  title.value = '';
  price.value = '';
  thumbnail.value = '';
})

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

  const inputNombre = document.querySelector('#nombre');
  const inputApellido = document.querySelector('#apellido');
  const inputEdad = document.querySelector('#edad');
  const inputAlias = document.querySelector('#alias');
  const inputAvatar = document.querySelector('#avatar');
  const dataMensaje = {
    author: {
      id: inputCorreo.value,
      nombre: inputNombre.value,
      apellido: inputApellido.value,
      edad: inputEdad.value,
      alias: inputAlias.value,
      avatar: inputAvatar.value
    },
    fecha: fecha,
    text: inputMensaje.value
  }
  inputMensaje.value = '';
  const result = [];
  const object = dataMensaje;
  object.id = 'AozbjQjJYLQaXqsa9dVV';
  result.push(dataMensaje);
  const originalData = {
    id: "mensajes",
    posts: result
  };
  console.log('originalData', originalData)
  // socket.emit('sendMensaje', dataMensaje);
  socket.emit('sendMensaje', normalizr.normalize(originalData, postsSchema));
});

socket.on('listarMensajes', (data) => {
  const contentMensajes = document.querySelector('.content-mensajes');
  contentMensajes.innerHTML = '';
  console.log('listarMensajes => data', data);
  const denormalizadoData = normalizr.denormalize(
    data.result,
    postsSchema,
    data.entities
  )
  if (data.length !== 0) {
    data.entities.posts.mensajes.posts.forEach(idMensaje => {
      const post = data.entities.post[idMensaje]

      console.log('post', post);
      const p = document.createElement('p');
      const spanEmail = document.createElement('span');
      const spanFecha = document.createElement('span');
      const spanMensaje = document.createElement('span');
      spanEmail.innerText = `${post.author} `;
      spanEmail.style.color = 'blue';
      p.appendChild(spanEmail);

      spanFecha.innerText = `${post.fecha} `;
      spanFecha.style.color = 'red';
      p.appendChild(spanFecha);

      spanMensaje.innerText = `: ${post.text}`;
      spanMensaje.style.color = 'green';
      p.appendChild(spanMensaje);

      contentMensajes.appendChild(p);
    });

    const compresionSpan = document.querySelector('.compresion');
    const desnormalizado = JSON.stringify(denormalizadoData).length;
    const normalizado = JSON.stringify(data).length;
    const resultado = Math.round((1 - (normalizado / desnormalizado)) * 100, 2)
    compresionSpan.innerText = resultado.toString() + "%";
  }
});