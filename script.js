
  window.onload = function() {
      
 var conf = function(_name, _date, _statusExe, _req) {
    this.name = _name;
    this.date = _date;
    this.statusExe = _statusExe;
    this.req = _req;
}    
  $("#addingButton").click(function() {
      var Conf = new conf($("#name").val(), $("#date").val(), $("#stat").val(), $("#req").val());
      $('#confs tr:last').after("<tr><td>" + Conf.name + "</td><td>" + Conf.date + "</td><td>" + Conf.statusExe + "</td><td>" + Conf.req + "</td><td title=\"" + Conf.date + "\" class=\"diff\">" + moment.utc(moment().diff(new Date(Conf.date))).format("YY:MM:DD:HH:mm:ss") + "</td></tr>");
  });

  function countdown() {
     var timers = document.getElementsByClassName("diff");
        for (var i = 0; i < timers.length; i++) {
            timers[i].innerText =  moment.utc(moment().diff(new Date($(timers[i]).attr('title')))).format("YY:MM:DD:HH:mm:ss");
        }
        
    };

setInterval(countdown, 1000);
  };