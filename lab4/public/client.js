$(document).ready(function(){
    function getUsers(){
        $.get('/getusers',function(data){
        createTable('#table',data)
        })
 }
 getUsers()
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
   
    deleteUser(id);
 });
 $('<button>').text('Update').addClass('btn btn-info')
 .appendTo('td:last').click(function(){
    $('.id').val($(this).parent().parent().find('td:first').text());
    $('.name').val($(this).parent().parent().find('td:eq(1)').text());
    $('.age').val($(this).parent().parent().find('td:eq(2)').text());
    $('#au').html("Update")
console.log($('#au').html())
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
        var n = $('.add').html();
        console.log(n)
       if( n.localeCompare("Add") == 0){
       
        console.log(".add" + name + age)
        addUser(name,age);
       }
       if( n.localeCompare("Update") == 0){
        var id =$('.id').val();
        $('.id').val("");
        $('.add').html("Add");
        console.log(id+" update " + name + age)
        updateUser(id, name, age);
       }
    })
    function deleteUser(id){
        var obj={id:id};
        $.post('/deleteuser',obj,function(data){
        console.log(data);
        getUsers();
        })
    }
    function updateUser(id, name, age){
        console.log("serdt")
        if(!name||!age || !id) return;
        console.log("333")
        var obj={
        id:id,
        name:name,
        age:age
        }
        $.post('/updateuser',obj,function(data){
        console.log(data);
        getUsers();
        })
        }
})
   
   