const express = require('express')
const router = express.Router()
const banco = require('../mysql').banco

// Cadastro de quadro

router.post('/', (req, res) => {
  let q = req.body
  let id = req.params.idQuadros

  const SQL = `INSERT INTO quadros (nome) VALUES ('${q.nome}')`

  banco.getConnection((erro, con) => {
    if (erro) {
      return res.status(500).send({
        mensagem:
          'Não foi possível atender a esta solicitação - Erro na conexão',
        detalhes: erro
      })
    }

    con.query(SQL, (erro, resultados) => {
      con.release()

      if (erro) {
        return res.status(500).send({
          mensagem: 'Erro ao cadastrar quadro',
          detalhes: erro
        })
      }

      return res.status(200).send({
        mensagem: 'Cadastro de quadro realizado com sucesso',
        id: resultados.insertId,
        nome_do_quadro: q.nome
      })
    })
  })
})

// Atualizar um quadro por seu id
router.patch('/:id', (req, res) => {
  let id = req.params.id
  let quadro = req.body

  const SQL = `UPDATE quadros SET nome = '${quadro.nome}' WHERE idQuadros = ${id}`

  banco.getConnection((erro, con) => {
    if (erro) {
      return res.status(500).send({
        mensagem:
          'Não foi possível atender a esta solicitação - Erro na conexão',
        detalhes: erro
      })
    }

    con.query(SQL, (erro, resultados) => {
      con.release()

      if (erro) {
        return res.status(500).send({
          mensagem: 'Erro ao atualizar o quadro',
          detalhes: erro
        })
      }

      return res.status(200).send({
        mensagem: 'Quadro atualizado com sucesso!'
      })
    })
  })
})

// Listar quadros
router.get('/', (req, res) => {
  const SQL = `SELECT * FROM quadros`

  banco.getConnection((erro, con) => {
    if (erro) {
      return res.status(500).send({
        mensagem:
          'Não foi possível atender a esta solicitação - Erro na conexão',
        detalhes: erro
      })
    }

    con.query(SQL, (erro, resultados) => {
      con.release()

      if (erro) {
        return res.status(500).send({
          mensagem: 'Erro ao exibir lista de quadros existentes',
          detalhes: erro
        })
      }

      return res.status(200).send({
        mensagem: 'Consulta realizada com sucesso',
        detalhes: resultados
      })
    })
  })
})
// Excluir quadros por seu id
router.delete('/:id', (req, res) => {
  let id = req.params.id

  const SQL = `DELETE FROM quadros WHERE idQuadros = ${id}`

  banco.getConnection((erro, con) => {
    if (erro) {
      return res.status(500).send({
        mensagem: 'Erro na conexão',
        detalhes: erro
      })
    }

    con.query(SQL, (erro, resultados) => {
      con.release()

      if (erro) {
        return res.status(500).send({
          mensagem: `Não foi possível excluir o quadro com o id: ${id}`,
          detalhes: erro
        })
      }

      if (resultados.affectedRows > 0) {
        return res.status(200).send({
          mensagem: `Quadro: ${id} excluído com sucesso`
        })
      } else {
        return res.status(200).send({
          mensagem: `Quadro do id ${id} não existe no banco de dados`
        })
      }
    })
  })
})

module.exports = router
