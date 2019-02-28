'use strict';

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
  ctx.beginPath();
  ctx.fillStyle = working.fg_color;
  ctx.arc(50, 50, 10, 0, Math.PI * 2);
  ctx.fill();

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

var reset_current = function(){
  working.points = [];
  console.log('reset');
  draw();
};
