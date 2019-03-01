'use strict';

var data,working;

var point1 = {};
var point2 = {};

var canvas_click = function(event){
  var mouse = {
    x:event.layerX,
    y:event.layerY
  };
  var pixel = ctx.getImageData(mouse.x, mouse.y, 1, 1).data;
  var color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
  var bg = working.bg_color;

  if(color !== bg && !point1.x){ //if color = red then we need it to hold onto the first point,
    point1.x = mouse.x;
    point1.y = mouse.y;
    ctx.beginPath();
    ctx.arc(mouse.x,mouse.y, 15, 0, Math.PI*2);
    ctx.strokeStyle= 'green';
    ctx.lineWidth = 2;
    ctx.stroke();
  } else if (point1.x) {
    point2.x = mouse.x;
    point2.y = mouse.y;
    working.points.push({ x1: point1.x, y1: point1.y, x2: point2.x, y2: point2.y });
    point1 = {};
    point2 = {};
    draw();
  } else {
    draw();
    point1 = {};
  }
};

var draw = function() {
  clear();
  // draw base image
  // ctx.beginPath();
  // ctx.fillStyle = working.fg_color;
  // ctx.arc(50, 50, 10, 0, Math.PI * 2);
  // ctx.fill();

  // array of points, draws a single thick line per point set
  for (var i = 0; i < working.points.length; i++) {
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.strokeStyle = working.fg_color;
    ctx.moveTo(working.points[i].x1, working.points[i].y1);
    ctx.lineTo(working.points[i].x2, working.points[i].y2);
    ctx.stroke();
  }
};

var clear = function() {
  ctx.fillStyle = working.bg_color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

var reset = function(){
  working.points = [];
  console.log('reset');
  draw();
};

var save_drawing = function(){
  if (data.open_idx < 12){
    data.images[data.open_idx] = working;
    data.current = data.open_idx; // set "current" to be the most recently saved image
    data.open_idx++;
    localStorage.setItem('nature_images', JSON.stringify(data));
  }
  else {
    if (overwrite_check()){
      data.images.push(data.images.shift());
      data.images[11] = working;
      localStorage.setItem('nature_images', JSON.stringify(data));
    }
  }
  alert(`Saved as image #${data.open_idx}`);
};
var retrieve = function(){
  if (localStorage.getItem('nature_images')){
    data = JSON.parse(localStorage.getItem('nature_images'));
    // if we're getting data after picking an image from the gallery to edit,
    // then we should load that one.
    // data.newImg = false;
    if (data.newImg) {
      // otherwise, working should be new
      working = new Img();
      return;
    } else {
      working = data.images[data.current];
    }
    // after retrieving data, set newImg flag to true, because we only load
    // images when coming in the first time.
    data.newImg = true;
  } else {
    data = new Image_Data();
    working = new Img();
  }
  draw();
};

var click_handler = function(event) {
  event.preventDefault();
  if (event.target.id === 'canvas') {
    canvas_click(event);
  }
  else if (event.target.id === 'reset_button') {
    reset();
  } else if (event.target.id === 'save_button') {
    console.log(data);
    save_drawing();
    // var dataUrl = canvas.toDataURL('image/png');
    // event.target.download = 'download_image';
    // event.target.href = dataUrl;
    // //<a href="./assets/mastersystem.png"><button class="button" id="one">Download</button>
    // console.log(event.target);

  } else return;
};


// on loading the data, we need to check... the current index.

// data.current is the controlling element which picks which image we're working
// on. data.current is what we change on other pages, then save the data object
// again


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// create the image data variable. this assumes we haven't tried to load data yet.
// should probably check if data exists first (storage item is called 'nature_images')
// and if it does, load it.
var el = document.getElementById('canvas');
var isDrawing;

el.onmousedown = function(e) {
  isDrawing = true;
  ctx.lineWidth = 10;
  ctx.lineJoin = ctx.lineCap = 'round';
  ctx.moveTo(e.layerX, e.layerY);
};
el.onmousemove = function(e) {
  if (isDrawing) {
    ctx.lineTo(e.layerX, e.layerY);
    ctx.stroke();
  }
};
el.onmouseup = function() {
  isDrawing = false;
};

retrieve();

draw();

//base image

//input user info at time of save (name, social media)
