const express = require('express')
const app = express()
const port = 3001
const mysql = require('mysql')
var bodyParser = require('body-parser')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
})
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(require('cors')())

app.get('/', (req, res) => {
  res.json({
    "check": "ping"
  })
})

app.post('/user', (req, res) => {
  console.log(req.body, "jauh")
  res.statusCode = 201
  res.json({
    "test":"ccc"
  })
  connection.query('INSERT INTO users (name, email) VALUES (?,?)', [req.body["name"], req.body["email"]])
})

app.get('/user', (req, res) => {
  res.statusCode = 201
  connection.query('SELECT * FROM users', (error, result, fields) => {
    console.log(fields)
    res.json(result)
  })
})

app.get('/user/:id', (req, res) => {
  res.statusCode = 200
  connection.query('SELECT * FROM users where id=?', [req.params.id], (error, result, fields) => {
    console.log("masuk")
    res.json(result[0])
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})