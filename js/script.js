
  window.onload = function() {
    
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
      var Conf = new conf($("#name").val(),  $("#desc").val(), $("#date").val(), $("#stat").val(), $("#req").val());
      $('#confs tr:last').after("<tr><td>" + Conf.name + "</td><td>" + Conf.desc + "</td><td>" + moment(Conf.date).format('YYYY/MM/DD HH:mm:ss') + "</td><td>" + Conf.statusExe + "</td><td>" + Conf.req + "</td><td title=\"" + Conf.date + "\" class=\"diff\"></td></tr>");
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