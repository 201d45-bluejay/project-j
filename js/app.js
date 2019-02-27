'use strict';

var Image_Data = function () {
  this.current = 0;
  this.open_idx = 0;
  this.images = []
  for (var i = 0; i < 12; i++) {
    this.images.push(new Img());
  }
};

var Img = function (points, tree, bg_color, fg_color) {
  this.points = points || [];
  this.type = tree || 'tree';
  this.bg_color = bg_color || 'rgb(255,255,255)';
  this.fg_color = fg_color || 'rgb(0,0,0)';
};

var point1 = {};
var point2 = {};

var canvas_click = function(event){
  //console.log(point1.x, bg, color);
  var mouse = {
    x:event.layerX,
    y:event.layerY
  };
  var pixel = ctx.getImageData(mouse.x, mouse.y, 1, 1).data;
  var color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
  var bg = data.images[data.current].bg_color;
  var fg = data.images[data.current].fg_color;
  //console.log(color, bg, fg);
  if(color !== bg || !point1.x){ //if color = red then we need it to hold onto the first point, 
  //   //if first click is valid, start saving data points, if not don't save
    console.log('hit');
    point1.x = mouse.x;
    point1.y = mouse.y;
  } else {
    point1 = {};
  }
  if (color === bg) console.log('miss', point1);
  if(point1.x && color === bg) {
    console.log('hit2', bg, color);
    point2.x = mouse.x;
    point2.y = mouse.y;
  }
  console.log(point1, point2);
  // ctx.beginPath();
  // ctx.fillStyle = fg;
  // ctx.arc(point1.x, point1.y, 10, 0, Math.PI*2);
  // ctx.lineTo(point2.x, point2.y);
  // ctx.stroke();
  //ctx.closePath();
  // ctx.fill();
};

var reset = function(){
  console.log('reset');
};

var save = function(){
  console.log('save');
  localStorage.setItem('data', JSON.stringify(data));
};

var click_handler = function(event) {
  event.preventDefault();
  if (event.target.id === 'canvas') {
    canvas_click(event);
  }
  else if (event.target.id === 'reset_button') {
    reset();
  } else if (event.target.id === 'save_button') {
    save();
    // console.log('save');
    // var dataUrl = canvas.toDataURL('image/png');
    // event.target.href = dataUrl;
    // //<a href="./assets/mastersystem.png"><button class="button" id="one">Download</button>
    // event.target.download = 'download_image';
    // console.log(event.target);

  } else return;


  //handle what happens on the canvas: read clicks and put dot on screen, put connecting line, hit regions.
  //handle clicks on buttons: reset, save, (images- stretch).

};


var event_target = document.getElementById('drawing_pad');
event_target.addEventListener('click' , click_handler , false);

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// create the image data variable. this assumes we haven't tried to load data yet.
var data = new Image_Data();
console.log(data);

ctx.fillStyle = data.images[data.current].bg_color;
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = data.images[data.current].fg_color;
ctx.arc(50, 50, 10, 0, Math.PI*2);
ctx.fill();


//local storage data handling: loading data, saving data, (data format - single object). Object id and array of things that have been added to canvas (undo if necessary)

//base image

//input user info at time of save (name, social media)

//remove handler?
