const express = require('express');
const knex = require('./db');

const app = express();
const port = 3001;

app.use(express.json());

app.get('/all', (req, res) => {
  knex
    .from('users')
    .select('id', 'name', 'email')
    .then(response => {
      res.send({data: response});
    });
});

app.post('/', (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }
  knex('users')
    .insert(data)
    .then(() => {
      console.log('Registro OK');
      res.send('Registro OK');
    })
    .catch((error) => {
      console.log('Error al guardar => ', error);
    });
});

app.get('/:id', (req, res) => {
  knex.from('users').where({ id: req.params.id })
    .then((json) => {
      res.send({ data: json });
    })
    .catch((error) => {
      console.log('Error al buscar usuario por ID => ', error);
    });
});


app.put('/update/:id', (req, res) => {
  knex('users')
    .where({id: req.params.id})
    .update({ name: req.body.name, email: req.body.email })
    .then(json => {
      res.send({data: json});
    })
    .catch((error) => {
      console.log('Error al actualizar el usuario por ID => ', error);
    });

});

app.delete('/deleteUser/:id', (req, res) => {
  knex('users')
    .where({id: req.params.id})
    .del()
    .then(() => {
      res.send({data: 'Usuario Eliminado'});
    })
    .catch((error) => {
      console.log('Error al Eliminar el usuario por ID => ', error);
    });
});

app.listen(port, () => {
  console.log(`Server runnig on port ${port}`);
});