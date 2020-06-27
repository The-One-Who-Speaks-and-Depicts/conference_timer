
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