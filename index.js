const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const porta = 3000;

const db = require('./queries/index')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/users', db.getUsers)
app.get('/users/:cod_paciente', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)
app.get('/historico', db.getHistorico)
app.get('/historico/:cod_paciente', db.getHistoricoById)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  });

  app.listen(porta, () => {
    console.log(`Aplicação rodando na porta ${porta}.`)
  })