'use strict';
var click_handler = function (event) {
    event.preventDefault();
  if (event.target.id === 'canvas') {
    console.log(event.layerX);
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.ellipse(event.layerX, event.layerY, 10, 10, 0, 0, Math.PI * 2); //ellipse requires last two parameters to be full 2pi radian circle.
    ctx.fill();

  }
  else if (event.target.id === 'reset_button') {
    console.log('reset');

  } else if (event.target.id === 'save_button') {
    console.log('save');
    var dataUrl = canvas.toDataURL('image/png');
    event.target.setAttributes('download', 'drawing');
    event.target.href = dataUrl;
    console.log(event.target);

  } else return;


  //handle what happens on the canvas: read clicks and put dot on screen, put connecting line, hit regions.
  //handle clicks on buttons: reset, save, (images- stretch).

};


var event_target = document.getElementById('drawing_pad');
event_target.addEventListener('click', click_handler, false);

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');




//local storage data handling: loading data, saving data, (data format - single object). Object id and array of things that have been added to canvas (undo if necessary)

//base image

//input user info at time of save (name, social media)

//remove handler?
