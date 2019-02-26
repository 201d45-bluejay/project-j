'use strict'; 

var edit = document.getElementById('images');
var download = document.getElementById('download');

edit.addEventListener('click', function (body){ 
  console.log(body.target.value);
});
download.addEventListener('click', function (body){ 
  console.log(body.target.value);

});


