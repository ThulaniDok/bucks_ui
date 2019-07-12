// declare variables
var playerContainer  = document.getElementById("player-info");
var btn  = document.getElementById("btn");
var sbmt  = document.getElementById("sbmt")
var url = 'http://localhost:3002/team/';

// get player info
btn.addEventListener("click", function() {
  var srch_name = document.getElementById("search").value;
  var request = new XMLHttpRequest();

  request.open('GET', url+srch_name, true);
  request.onload = function() {
    var ourData = JSON.parse(request.responseText);
    //alert(ourData);
    renderHTML(ourData);
  };
  request.setRequestHeader("Content-type", "application/json");
  //request.withCredentials = false;
  request.send();
});

var addForm = document.getElementById("addForm");

//add player info
addForm.addEventListener("submit", function(e) {
  e.preventDefault();
var plyr_name = document.getElementById("name").value;
var plyr_surname = document.getElementById("surname").value;
var plyr_position = document.getElementById("position").value;
var plyr_age = document.getElementById("age").value;

var player = {
  name: plyr_name,
  surname: plyr_surname,
  position: plyr_position,
  age: plyr_age
}

console.log(player)

var request = new XMLHttpRequest();

request.open('POST', url);
request.onload = function() {
console.log(request.responseText);
}

request.setRequestHeader("Content-Type", "application/json");
    var content  = JSON.stringify({plyr: player});
  console.log(content)
  request.send(content);
    });


// display player on html
function renderHTML(data) {
    var txt = document.createElement('p');
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var len = data.length;
    var table = document.getElementById("tbl");
    var tbody = document.createElement("tbody");

    for (var i = 0; i < len; i++) {
      var plr = data[i];
      console.log(plr);
      var tr = document.createElement("tr");

      for (var key in plr) {
        var detail = plr[key];
        console.log(detail);
        var td = document.createElement("td");
        var txt = document.createTextNode(detail);
        td.appendChild(txt);
        tr.appendChild(td);
        tbody.appendChild(tr);
      };

      table.appendChild(tbody);
  }
};