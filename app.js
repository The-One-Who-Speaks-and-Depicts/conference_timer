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
/*
app.put('/api/confs', jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400)

  var confId = req.body.id;
  var confName = req.body.name;
  var confDesc = req.body.desc;
  var confDate = req.body.date;
  var confStat = req.body.stat;
  var confReq = req.body.req_size;

  var data = fs.readFileSync('confs.json', 'utf8');
  var confs = JSON.parse(data);
  var conf;
  for (var i = 0; i < confs.length; i++) {
    if (confs[i].id == confId) {
      conf = confs[i];
      break;
    }
  }
  // изменяем данные у пользователя
  if (conf) {    
    conf.name = confName;
    conf.desc = confDesc;
    conf.date = confDate;
    conf.stat = confStat;
    conf.req_size = confReq;
    var data = JSON.stringify(confs);
    fs.writeFileSync('confs.json', data);
    res.send(conf);
  } else {
    res.status(404).send(conf);
  }
})*/
app.listen(3000, function() {
  console.log('Сервер ожидает подключения...');
})