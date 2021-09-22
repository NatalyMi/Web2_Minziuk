$(document).ready(function(){
    function createTable(container,mas){
        var tmp =Object.keys(mas[0])
        var col = [];
       
        for (var i = 0; i <tmp.length; i++) {
                col.push(tmp[i]);
        }

        var table = document.createElement("table");

        var tr = table.insertRow(0);
        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");
            th.innerHTML = col[i];
            tr.appendChild(th);
        }
        for (var i = 0; i < mas.length; i++) {
    
            tr = table.insertRow(-1);
            var tmpArr =Object.values(mas[i])
            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = tmpArr[j];
            }
        }   
       $(container).append(table);
       $(container).css("color", "blueviolet")
       $(container).addClass("t")
    }
   function getUsers(){
        $.get('/getusers',function(data){
        createTable('#table',data)
        })
 }

   
    getUsers()
})

