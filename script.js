
  window.onload = function() {
      
 var conf = function(_name, _date, _statusExe, _req) {
    this.name = _name;
    this.date = _date;
    this.statusExe = _statusExe;
    this.req = _req;
}    
  $("#addingButton").click(function() {
      var Conf = new conf($("#name").val(), $("#date").val(), $("#stat").val(), $("#req").val());
      $('#confs tr:last').after("<tr><td>" + Conf.name + "</td><td>" + Conf.date + "</td><td>" + Conf.statusExe + "</td><td>" + Conf.req + "</td><td title=\"" + Conf.date + "\" class=\"diff\"></td></tr>");
  });

  function countdown() {
     var timers = document.getElementsByClassName("diff");
        for (var i = 0; i < timers.length; i++) {
            let secs = Math.floor(moment.utc(new Date($(timers[i]).attr('title'))).diff(moment.utc(new Date()))/1000);
            if (secs > 0) {                
                if (secs > 60) {
                    let mins = Math.floor(secs/60);
                    if (secs % 60 == 0) {                        
                        timers[i].innerText = mins + " minutes, " + 0 + " seconds";
                    }
                    else {
                        timers[i].innerText = Math.floor(secs/60) + " minutes, " + secs % 60 + " seconds";
                    }
                }
                else {
                    timers[i].innerText = secs + " seconds";
                }
                    
            }
            else {
                timers[i].innerText = "Time have run out!";
            }
            
        }
        
    };

setInterval(countdown, 1000);
  };