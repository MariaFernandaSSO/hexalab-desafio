const express = require('express')
const router = express.Router()
const banco = require('../mysql').banco

// Cadastrar tarefa
router.post('/', (req, res) => {
  let tarefa = req.body
  let id = req.params.idQuadros

  const SQL = `INSERT INTO tarefas (titulo_tarefa, descricao, status, fk_tarefas_quadros) VALUES ('${tarefa.titulo_tarefa}', '${tarefa.descricao}', '${tarefa.status}', ${tarefa.fk_tarefas_quadros})`

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
          mensagem: 'Erro ao cadastrar tarefa',
          detalhes: erro
        })
      }

      return res.status(200).send({
        mensagem: 'Cadastro de tarefa realizado com sucesso',
        id: resultados.insertId,
        titulo_tarefa: tarefa.titulo_tarefa,
        descricao: tarefa.descricao,
        status: tarefa.status,
        id_quadro: tarefa.fk_tarefas_quadros
      })
    })
  })
})

// Atualizar tarefa
router.patch('/:id', (req, res) => {
  let id = req.params.id
  let tarefa = req.body

  const SQL = `UPDATE tarefas SET titulo_tarefa = '${tarefa.titulo_tarefa}', descricao = '${tarefa.descricao}', status = '${tarefa.status}' WHERE idTarefas = ${id}`

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
          mensagem: 'Erro ao atualizar a tarefa',
          detalhes: erro
        })
      }

      return res.status(200).send({
        mensagem: 'Tarefa atualizada com sucesso!',
        id: id,
        titulo_tarefa: tarefa.titulo_tarefa,
        descricao: tarefa.descricao,
        status: tarefa.status
      })
    })
  })
})

// Listar tarefas de um determinado quadro
router.get('/:id', (req, res) => {
  let id = req.params.id

  const SQL = `SELECT * FROM tarefas WHERE fk_tarefas_quadros = ${id}`

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
          mensagem: `Erro ao exibir lista de tarefas relacionadas ao quadro de id : ${id}`,
          detalhes: erro
        })
      }

      return res.status(200).send({
        mensagem: `Consulta realizada com sucesso - Tarefas relacionadas ao quadro de id : ${id}`,
        detalhes: resultados
      })
    })
  })
})

// Excluir uma tarefa
router.delete('/:id', (req, res) => {
  let id = req.params.id

  const SQL = `DELETE FROM tarefas WHERE idTarefas = ${id}`

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
          mensagem: `Não foi possível excluir a tarefa com o id: ${id}`,
          detalhes: erro
        })
      }

      if (resultados.affectedRows > 0) {
        return res.status(200).send({
          mensagem: `Tarefa do id : ${id} excluída com sucesso`
        })
      } else {
        return res.status(200).send({
          mensagem: `Tarefa do id: ${id} não existe no banco de dados`
        })
      }
    })
  })
})
module.exports = router
