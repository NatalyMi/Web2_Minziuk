$(document).ready(function(){
    function getUsers(){
        $.get('/getusers',function(data){
        createTable('#table',data)
        })
 }
function createTable(element,mas){
    $(element).empty();
    console.log(mas);
    $('<table>')
    .addClass("table table-bordered table-primary col-6")
    .appendTo(element);
    for(var i=0;i<mas.length;i++){
    $('<tr>').addClass('tr').appendTo('.table');
    for(var key in mas[i]){
    $('<td>').addClass('td')
    .appendTo('.tr:last').text(mas[i][key]);
    }
    $('.tr:last .td:first').hide();
    $('<td>').appendTo('.tr:last');
    $('<button>').text('Delete').addClass('btn btn-danger')
    .appendTo('td:last').click(function(){
    var id=$(this).parent().parent().find('td:first').text();
    console.log(id);
    deleteUser(id);
 });

    }
   }
   function addUser(name,age){
    if(!name||!age) return;
    var obj={
    username:name,
    userage:age
    }
    $.post('/adduser',obj,function(data){
    console.log(data);
    getUsers();
    })
    }
    $('.add').click(function(){
       
        var name=$('.name').val();
        var age=$('.age').val();
        $('.name').val("");
        $('.age').val("");
       // console.log(".add" + name + age)
        addUser(name,age);
    })
    function deleteUser(id){
        var obj={id:id};
        $.post('/deleteuser',obj,function(data){
        console.log(data);
        getUsers();
        })
        }
    })
   
   