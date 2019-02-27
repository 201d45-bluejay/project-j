'use strict';

var data,working;

var Image_Data = function () {
  this.current = 0; // either points at "most recent image" or "load this one"
  this.open_idx = 0;
  this.images = [];
  this.newImg = true;
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
  var mouse = {
    x:event.layerX,
    y:event.layerY
  };
  var pixel = ctx.getImageData(mouse.x, mouse.y, 1, 1).data;
  var color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
  var bg = working.bg_color;

  if(color !== bg && !point1.x){ //if color = red then we need it to hold onto the first point,
    console.log('hit');
    point1.x = mouse.x;
    point1.y = mouse.y;
    ctx.beginPath();
    ctx.arc(mouse.x,mouse.y, 15, 0, Math.PI*2);
    ctx.strokeStyle= 'green';
    ctx.lineWidth = 2;
    ctx.stroke();
  } else if (point1.x) {
    console.log('bghit2');
    point2.x = mouse.x;
    point2.y = mouse.y;
    working.points.push({ x1: point1.x, y1: point1.y, x2: point2.x, y2: point2.y });
    point1 = {};
    point2 = {};
    console.log('data:', data);
    draw();
  } else {
    draw();
    point1 = {};
  }
  console.log(working);
};

var draw = function() {
  clear();
  // draw base image
  ctx.beginPath();
  ctx.fillStyle = working.fg_color;
  ctx.arc(50, 50, 10, 0, Math.PI * 2);
  ctx.fill();

  // array of points, draws a single thick line per point set
  for (var i = 0; i < working.points.length; i++) {
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.lineCap = 'butt';
    ctx.strokeStyle = working.fg_color;
    ctx.moveTo(working.points[i].x1, working.points[i].y1);
    ctx.lineTo(working.points[i].x2, working.points[i].y2);
    ctx.stroke();
  }
};

var clear = function() {
  ctx.fillStyle = working.bg_color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

var reset = function(){
  working.points = [];
  console.log('reset');
  draw();
};

var overwrite_check = function(){
  return confirm('overwrite oldest image?');
};

var save = function(){
  if (data.open_idx < 12){
    data.images[data.open_idx] = working;
    data.current = data.open_idx;
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
    data.newImg = false;
    if (data.newImg) {
      // otherwise, working should be new
      working = new Img();
      return;
    }
    working = data.images[data.current];
    console.log(data, working);
  } else {
    data = new Image_Data();
    // console.log(data);
    working = new Img();
    console.log('empty', data, working);
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
    // data.open_idx = 12;   //TODO:delete when done
    console.log(data);
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

// for drawing, we need to take a set of points and draw the correct shape for
// that set of points.
// for a tree, for now, let's do... a rectangle? narrow and length = distance
// between click points?

// on loading the data, we need to check... the current index.

// data.current is the controlling element which picks which image we're working
// on. data.current is what we change on other pages, then save the data object
// again

// when does the open_idx get incremented? When we save an image into an open slot.
// save image into [open_idx] and increment open_idx.
// if open_idx === 12, trigger the warning to ask if the user wants to delete
// the oldest image. if they respond yes (true response from the ask function)
// then we data.images.push(data.images.shift()); to take the first image off
// the front of the array and add it to the end of the array.
// then save into spot 11.

// need a function that unhides the warning asking if a user wants to overwrite
// their oldest item.
// for now, just use a confirm('message') to get true or false, we can write
// the pretty version on HTML later, as a stretch goal.

var event_target = document.getElementById('drawing_pad');
event_target.addEventListener('click' , click_handler , false);

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// create the image data variable. this assumes we haven't tried to load data yet.
// should probably check if data exists first (storage item is called 'nature_images')
// and if it does, load it.

retrieve();

draw();

// ctx.fillStyle = data.images[data.current].bg_color;
// ctx.fillRect(0, 0, canvas.width, canvas.height);
// ctx.fillStyle = data.images[data.current].fg_color;
// ctx.arc(50, 50, 10, 0, Math.PI*2);
// ctx.fill();


//local storage data handling: loading data, saving data, (data format - single object). Object id and array of things that have been added to canvas (undo if necessary)

//base image

//input user info at time of save (name, social media)

//remove handler?
