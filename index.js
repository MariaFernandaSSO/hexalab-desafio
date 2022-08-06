const express = require('express')
const server = express()
const { banco } = require('./mysql')

const bodyParser = require('body-parser')
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

//rotas
const rotaQuadros = require('./rotas/quadros')
server.use('/quadros', rotaQuadros)
const rotaTarefas = require('./rotas/tarefas')
server.use('/tarefas', rotaTarefas)

server.get('/conectar', (req, res) => {
  banco.getConnection((erro, con) => {
    if (erro) {
      return res.status(500).send({
        mensagem: 'Erro de conexão',
        erro: erro
      })
    }

    return res.status(200).send({
      mensagem: 'Conectado com sucesso!'
    })
  })
})

server.listen(3000, () => {
  console.log('Servidor funcionando!')
})
