const pool = require('./config');

var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')

var app = express()
var jsonParser = bodyParser.json()

app.use(express.static(__dirname + '/public'))

// получение списка данных
app.get('/api/confs', (request, response) => {
    pool.query('SELECT * FROM confs ORDER BY date', (error, result) => {
        if (error) throw error;
 
        response.send(result);
    });
});


// получение отправленных данных
var bodyParser = require("body-parser");
app.use(bodyParser.json())
app.post('/api/confs', (request, response) => {
    pool.query('INSERT INTO confs SET ?', [request.body], (error, result) => {
        if (error) throw error;
 
        response.status(201).send(`Conference added with ID: ${result.insertId}`);
    });
});

// удаление пользователя по id
app.delete('/api/confs/:id', (request, response) => {
    const id = request.params.id;
 
    pool.query('DELETE FROM confs WHERE id = ?', [id], (error, result) => {
        if (error) throw error;
 
        response.send('Conference deleted.');
    });
});


//получение пользователя по id
app.get('/api/confs/:id', (request, response) => {
    const id = request.params.id;
 
    pool.query('SELECT * FROM confs WHERE id = ?', [id], (error, result) => {
        if (error) throw error;
 
        response.send(result);
    });
});

// изменение пользователя
app.put('/api/confs/:id', (request, response) => {
    const id = request.params.id;
 
    pool.query('UPDATE confs SET ? WHERE id = ?', [request.body, id], (error, result) => {
        if (error) throw error;
 
        response.send('Conference updated successfully.');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});