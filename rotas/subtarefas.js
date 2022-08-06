const express = require('express')
const router = express.Router()
const banco = require('../mysql').banco

// cadastrar subtarefa
router.post('/', (req, res) => {
  let sub = req.body

  const SQL = `INSERT INTO subtarefas (titulo_subtarefa, descricao, status, fk_subtarefas_tarefas) VALUES ('${sub.titulo_subtarefa}', '${sub.descricao}', '${sub.status}', ${sub.fk_subtarefas_tarefas})`

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
          mensagem: 'Erro ao cadastrar subtarefa',
          detalhes: erro
        })
      }

      return res.status(200).send({
        mensagem: 'Cadastro de subtarefa realizado com sucesso',
        id: resultados.insertId,
        titulo_subtarefa: sub.titulo_subtarefa,
        descricao: sub.descricao,
        status: sub.status,
        id_tarefa: sub.fk_subtarefas_tarefas
      })
    })
  })
})

// atualizar subtarefa
router.patch('/:id', (req, res) => {
  let id = req.params.id
  let sub = req.body

  const SQL = `UPDATE subtarefas SET titulo_subtarefa = '${sub.titulo_subtarefa}', descricao = '${sub.descricao}', status = '${sub.status}' WHERE idSubtarefas = ${id}`

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
          mensagem: 'Erro ao atualizar subtarefa',
          detalhes: erro
        })
      }

      return res.status(200).send({
        mensagem: 'Subtarefa atualizada com sucesso!',
        id: id,
        titulo_subtarefa: sub.titulo_tarefa,
        descricao: sub.descricao,
        status: sub.status
      })
    })
  })
})

// listar subtarefa de uma determinada tarefa
router.get('/:id', (req, res) => {
  let id = req.params.id

  const SQL = `SELECT * FROM subtarefas WHERE fk_subtarefas_tarefas=${id}`

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
          mensagem: `Erro ao exibir lista de subtarefas relacionadas as tarefas de id : ${id}`,
          detalhes: erro
        })
      }

      return res.status(200).send({
        mensagem: `Consulta realizada com sucesso - Subtarefas relacionadas as tarefas de id : ${id}`,
        detalhes: resultados
      })
    })
  })
})

// excluir subtarefa
router.delete('/:id', (req, res) => {
  let id = req.params.id

  const SQL = `DELETE FROM subtarefas WHERE idSubtarefas = ${id}`

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
          mensagem: `Não foi possível excluir a subtarefa com o id: ${id}`,
          detalhes: erro
        })
      }

      if (resultados.affectedRows > 0) {
        return res.status(200).send({
          mensagem: `Subtarefa do id : ${id} excluída com sucesso`
        })
      } else {
        return res.status(200).send({
          mensagem: `Subtarefa do id: ${id} não existe no banco de dados`
        })
      }
    })
  })
})
module.exports = router
