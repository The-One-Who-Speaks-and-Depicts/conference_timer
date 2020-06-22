
  window.onload = function() {
      
 var conf = function(_name, _date, _statusExe, _req) {
    this.name = _name;
    this.date = _date;
    this.statusExe = _statusExe;
    this.req = _req;
}    
  $("#addingButton").click(function() {
      var Conf = new conf($("#name").val(), $("#date").val(), $("#stat").val(), $("#req").val());
      $('#confs tr:last').after("<tr><td>" + Conf.name + "</td><td>" + Conf.date + "</td><td>" + Conf.statusExe + "</td><td>" + Conf.req + "</td></tr>");
  });
  };