const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cpmed',
  password: '123',
  port: 5432,
})

// Tabela Pacientes
const getUsers = (request, response) => {
    pool.query('SELECT * FROM pacientes ORDER BY nome ASC ', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getUserById = (request, response) => {
    const cod_paciente = request.params.cod_paciente;
  
    pool.query(`SELECT * FROM tb_paciente WHERE cod_paciente = ${cod_paciente}`, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const createUser = async (request, response) => {
    const { id_paciente, nome, cpf, dt_nascimento, telefone, endereco, id_sexo_sexo } = request.body;


      await pool.query(`INSERT INTO pacientes (id_paciente, nome, cpf, dt_nascimento, telefone, endereco, id_sexo_sexo) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [id_paciente, nome, cpf, dt_nascimento, telefone, endereco, id_sexo_sexo])
      .then(() => response.status(201).send())
      .catch(({ message }) => response.status(500).send({ message }));
   
  }
 
  const updateUser = (request, response) => {
    const cod_paciente = parseInt(request.params.cod_paciente)
    const { nome, cpf, dt_nascimento, telefone, endereco } = request.body
  
    pool.query(
      `UPDATE tb_paciente SET nome = ${nome}, email = $2 WHERE cod_paciente = $3`,
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
  
    pool.query('DELETE FROM tb_paciente WHERE cod_paciente = $1', [cod_paciente], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with cod_paciente: ${cod_paciente}`)
    })
  }

  // Tabela Histórico

/*   const getHistorico = (request, response) => {
    pool.query('SELECT * FROM historico', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }   */

  const getHistoricoById = (request, response) => {
    //const cod_paciente = request.params.cod_paciente;
  
    pool.query(`SELECT * FROM tb_historico as H INNER JOIN tb_agendamento as A ON h.id_historico = a.id_historico_fk INNER JOIN tb_profissional as P ON p.id_profissional = a.id_profissional_fk`, (error, results) => {
      try {
        response.status(200).json(results.rows)
      } catch (error) {
        throw error
      }
      
    })
  } 
  
  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    //getHistorico,
    getHistoricoById
  }