/*
  window.onload = function() {
      
    $('#stat').change(function() {        
        if ($('#stat').val() == "пользовательский статус") {
            document.getElementById("stat_user").style.display = "inline";
        }
        else if ((document.getElementById("stat_user").style.display == "inline") && ($('#stat').val() != "пользовательский статус")) {
            document.getElementById("stat_user").style.display = "none";
        }
    });
    
    var textarea = document.querySelector('textarea');

textarea.addEventListener('keyup', function(){
  if(this.scrollTop > 0){
    this.style.height = this.scrollHeight + "px";
  }
});
      
 var conf = function(_name, _desc, _date, _statusExe, _req) {
    this.name = _name;
    this.desc = _desc;
    this.date = _date;
    this.statusExe = _statusExe;
    this.req = _req;
}    
  $("#addingButton").click(function() {
      if ($("#name").val() == "" || $("#desc").val() == "" || $("#req_num").val() == "" || ($('#stat').val() == "пользовательский статус" && $('#stat_user').val() == "") || (moment($('#date').val()).format('YYYY/MM/DD HH:mm:ss') == "Invalid date")) {
          alert('Заполните все поля!');
      }
      else {
          var statusConf = "";
          if ($('#stat').val() == "пользовательский статус") {
              statusConf = $('#stat_user').val();
          }
          else {
              statusConf = $('#stat').val();
          }
          var Conf = new conf($("#name").val(),  $("#desc").val(), $("#date").val(), statusConf, $("#req_num").val() + " " + $("#req_opt").val());
          $('#confs tr:last').after("<tr><td class=\"identificator\"></td><td id=\"nameText\">" + Conf.name + "</td><td id=\"descText\">" + Conf.desc + "</td><td id=\"dateText\">" + moment(Conf.date).format('YYYY/MM/DD HH:mm:ss') + "</td><td id=\"status\">" + Conf.statusExe + "</td><td id=\"status\">" + Conf.req + "</td><td id=\"dateLeft\" title=\"" + Conf.date + "\" class=\"diff\"></td></tr>");
      }
    });

  function countdown() {
     var timers = document.getElementsByClassName("diff");
        for (var i = 0; i < timers.length; i++) {
            timers[i].innerText = "";
            let secs = Math.floor(moment.utc(new Date($(timers[i]).attr('title'))).diff(moment.utc(new Date()))/1000);
            if (secs > 0) {                
                if (secs > 60) {
                    let mins = Math.floor(secs/60);
                    if (mins > 60) {
                        let hours = Math.floor(mins/60);
                        if (hours > 24) {
                            let days = Math.floor(hours/24);                            
                            timers[i].innerText += days + " days,";
                            hours = hours % 24;
                        }
                        timers[i].innerText += " " + hours + " hours, ";
                    }
                    mins = mins % 60;                  
                    if (secs % 60 == 0) {                        
                        timers[i].innerText += " " + mins + " minutes, " + 0 + " seconds";
                    }
                    else {
                        timers[i].innerText += " " + mins + " minutes, " + secs % 60 + " seconds";
                    }                   
                }
                else {
                    timers[i].innerText += " " + secs + " seconds";
                }
                    
            }
            else {
                timers[i].innerText += "Time have run out!"; // option for automatical deletion
            }
            
        }
        
    };

setInterval(countdown, 1000);
  };
*/

     function GetUsers() {
        $.ajax({
          url: '/api/confs',
          type: 'GET',
          contentType: 'application/json',
          success: function(confs) {
            var rows = '';
            $.each(confs, function(index, conf) {
              // добавляем полученные элементы в таблицу
              rows += row(conf);
            })
            $('table tbody').append(confs);
          }
        })
      }
      // Получение одного пользователя
      function GetUser(id) {
        $.ajax({
          url: '/api/confs/' + id,
          type: 'GET',
          contentType: 'application/json',
          success: function(conf) {
            var form = document.forms['confsForm']
            form.elements['id'].value = conf.id;
            form.elements['name'].value = conf.name;
            form.elements['desc'].value = conf.desc;
            form.elements['date'].value = conf.date;
            form.elements['stat'].value = conf.stat;
            form.elements['req_size'].value = conf.req_size;
          }
        })
      }
      // Добавление пользователя
      function CreateUser(userName, userAge) {
        $.ajax({
          url: 'api/users',
          contentType: 'application/json',
          method: 'POST',
          data: JSON.stringify({
            name: confName,
            desc: confDesc,
            date: confDate,
            stat: confStat,
            req_size: confReq
          }),
          success: function(conf) {
            reset()
            $('table tbody').append(row(conf))
          }
        })
      }
      // Изменение пользователя
      function EditUser(userId, userName, userAge) {
        $.ajax({
          url: 'api/users',
          contentType: 'application/json',
          method: 'PUT',
          data: JSON.stringify({
            id: userId,
            name: userName,
            age: userAge
          }),
          success: function(user) {
            reset()
            $("tr[data-rowid='" + user.id + "']").replaceWith(row(user))
          }
        })
      }

      // сброс формы
      function reset() {
        var form = document.forms['userForm']
        form.reset()
        form.elements['id'].value = 0
      }

      // Удаление пользователя
      function DeleteUser(id) {
        $.ajax({
          url: 'api/users/' + id,
          contentType: 'application/json',
          method: 'DELETE',
          success: function(user) {
            console.log(user)
            $("tr[data-rowid='" + user.id + "']").remove()
          }
        })
      }
      // создание строки для таблицы
      var row = function(user) {
        return "<tr data-rowid='" + user.id + "'><td>" + user.id + '</td>' + '<td>' + user.name + '</td> <td>' + user.age + '</td>' + "<td><a class='editLink' data-id='" + user.id + "'>Изменить</a> | " + "<a class='removeLink' data-id='" + user.id + "'>Удалить</a></td></tr>"
      }
      // сброс значений формы
      $('#reset').click(function(e) {
        e.preventDefault()
        reset()
      })

      // отправка формы
      $('form').submit(function(e) {
        e.preventDefault()
        var id = this.elements['id'].value
        var name = this.elements['name'].value
        var age = this.elements['age'].value
        if (id == 0) CreateUser(name, age)
        else EditUser(id, name, age)
      })

      // нажимаем на ссылку Изменить
      $('body').on('click', '.editLink', function() {
        var id = $(this).data('id')
        GetUser(id)
      })
      // нажимаем на ссылку Удалить
      $('body').on('click', '.removeLink', function() {
        var id = $(this).data('id')
        DeleteUser(id)
      })

      // загрузка пользователей
      GetUsers()