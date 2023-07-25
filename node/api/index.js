const express = require('express')
const mysql = require('mysql')

const api = express()

const PORT = 3000

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

const connection = mysql.createConnection(config)

let sql = `INSERT INTO people(name) VALUES(${'Name' + (Math.floor(Math.random() * 1000) + 1)})`

connection.query(sql)

sql = `SELECT * FROM people`

let peoples = []

connection.query(sql, (err, results) => {
  if (err) {
    console.error('Erro ao executar a consulta:', err);
  } else {
    console.log('Lista de registros:');
    console.log(results);
    peoples = results
  }
});

connection.end()

api.get('/', (_req, res) => {
  res.json({ status: 'ok', peoples })
})

api.listen(PORT, () => console.log(`API running on port ${PORT}`))