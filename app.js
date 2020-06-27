var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')

var app = express()
var jsonParser = bodyParser.json()

app.use(express.static(__dirname + '/public'))
// получение списка данных
app.get('/api/confs', function(req, res) {
  var content = fs.readFileSync('confs.json', 'utf8')
  var confs = JSON.parse(content)
  res.send(confs)
})
// получение одного пользователя по id
app.get('/api/confs/:id', function(req, res) {
  var id = req.params.id; // получаем id
  var content = fs.readFileSync('confs.json', 'utf8');
  var confs = JSON.parse(content);
  var conf = null;
  // находим в массиве пользователя по id
  for (var i = 0; i < confs.length; i++) {
    if (confs[i].id == id) {
      conf = confs[i]
      break
    }
  }
  // отправляем пользователя
  if (conf) {
    res.send(conf);
  } else {
    res.status(404).send();
  }
});
// получение отправленных данных
app.post('/api/confs', jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  
  var confName = req.body.name;
  var confDesc = req.body.desc;
  var confDate = req.body.date;
  var confStat = req.body.stat;
  var confReq = req.body.req_size;
  var conf = { name: confName, desc: confDesc, date: confDate, stat: confStat, req_size: confReq }

  var data = fs.readFileSync('confs.json', 'utf8');
  var confs = JSON.parse(data)

  // находим максимальный id
  var id = Math.max.apply(
    Math,
    confs.map(function(o) {
      return o.id
    })
  )
  // увеличиваем его на единицу
  conf.id = id + 1
  // добавляем пользователя в массив
  confs.push(conf)
  var data = JSON.stringify(confs)
  // перезаписываем файл с новыми данными
  fs.writeFileSync('confs.json', data)
  res.send(conf)
})
// удаление пользователя по id
app.delete('/api/confs/:id', function(req, res) {
  var id = req.params.id
  var data = fs.readFileSync('confs.json', 'utf8')
  var confs = JSON.parse(data)
  var index = -1
  // находим индекс пользователя в массиве
  for (var i = 0; i < confs.length; i++) {
    if (confs[i].id == id) {
      index = i
      break
    }
  }
  if (index > -1) {
    // удаляем пользователя из массива по индексу
    var conf = confs.splice(index, 1)[0]
    var data = JSON.stringify(confs)
    fs.writeFileSync('confs.json', data)
    // отправляем удаленного пользователя
    res.send(conf)
  } else {
    res.status(404).send()
  }
})
// изменение пользователя
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
})

app.listen(3000, function() {
  console.log('Сервер ожидает подключения...');
})