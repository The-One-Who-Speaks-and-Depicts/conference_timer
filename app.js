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
app.get('/api/users/:id', function(req, res) {
  var id = req.params.id; // получаем id
  var content = fs.readFileSync('confs.json', 'utf8');
  var confs = JSON.parse(content);
  var conf = null;
  // находим в массиве пользователя по id
  for (var i = 0; i < confs.length; i++) {
    if (confs[i].id == id) {
      conf = confs[i];
      break;
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
app.post('/api/users', jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  
  var confName = req.body.name;
  var confDesc = req.body.desc;
  var confDate = req.body.date;
  var confStat = req.body.stat;
  var confReq = req.body.req_size;
  var user = { name: confName, desc: confDesc, date: confDate, stat: confStat, req_size: confReq }

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
app.delete('/api/users/:id', function(req, res) {
  var id = req.params.id
  var data = fs.readFileSync('users.json', 'utf8')
  var users = JSON.parse(data)
  var index = -1
  // находим индекс пользователя в массиве
  for (var i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      index = i
      break
    }
  }
  if (index > -1) {
    // удаляем пользователя из массива по индексу
    var user = users.splice(index, 1)[0]
    var data = JSON.stringify(users)
    fs.writeFileSync('users.json', data)
    // отправляем удаленного пользователя
    res.send(user)
  } else {
    res.status(404).send()
  }
})
// изменение пользователя
app.put('/api/users', jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400)

  var userId = req.body.id
  var userName = req.body.name
  var userAge = req.body.age

  var data = fs.readFileSync('users.json', 'utf8')
  var users = JSON.parse(data)
  var user
  for (var i = 0; i < users.length; i++) {
    if (users[i].id == userId) {
      user = users[i]
      break
    }
  }
  // изменяем данные у пользователя
  if (user) {
    user.age = userAge
    user.name = userName
    var data = JSON.stringify(users)
    fs.writeFileSync('users.json', data)
    res.send(user)
  } else {
    res.status(404).send(user)
  }
})

app.listen(3000, function() {
  console.log('Сервер ожидает подключения...')
})