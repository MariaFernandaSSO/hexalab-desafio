const mysql = require('mysql2')
const banco = mysql.createPool({
  host: 'localhost',
  database: 'desafiohexaquadro',
  user: 'root',
  password: ''
})

exports.banco = banco
