const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cpmed',
  password: '123',
  port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM tb_pacientes ORDER BY nome_completo ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getUserById = (request, response) => {
    const cod_paciente = parseInt(request.params.cod_paciente)
  
    pool.query('SELECT * FROM tb_pacientes WHERE cod_paciente = $1', [cod_paciente], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const createUser = (request, response) => {
    const { name, email } = request.body
  
    pool.query('INSERT INTO tb_pacientes (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Paciente criado com o código: ${result.insertcod_paciente}`)
    })
  }
  
  const updateUser = (request, response) => {
    const cod_paciente = parseInt(request.params.cod_paciente)
    const { name, email } = request.body
  
    pool.query(
      'UPDATE tb_pacientes SET name = $1, email = $2 WHERE cod_paciente = $3',
      [name, email, cod_paciente],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Paciente atualizado com o código: ${cod_paciente}`)
      }
    )
  }
  
  const deleteUser = (request, response) => {
    const cod_paciente = parseInt(request.params.cod_paciente)
  
    pool.query('DELETE FROM tb_pacientes WHERE cod_paciente = $1', [cod_paciente], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with cod_paciente: ${cod_paciente}`)
    })
  }
  
  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }