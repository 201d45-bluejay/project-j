'use strict';

var point1 = {};
var point2 = {};

var canvas_click = function(event, cntxt){
  var mouse = {
    x:event.layerX,
    y:event.layerY
  };
  var pixel = cntxt.getImageData(mouse.x, mouse.y, 1, 1).data;
  var color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
  var bg = working.bg_color;

  if(color !== bg && !point1.x){ //if color = red then we need it to hold onto the first point,
    point1.x = mouse.x;
    point1.y = mouse.y;
    cntxt.beginPath();
    cntxt.arc(mouse.x,mouse.y, 15, 0, Math.PI*2);
    cntxt.strokeStyle= 'green';
    cntxt.lineWidth = 2;
    cntxt.stroke();
  } else if (point1.x) {
    point2.x = mouse.x;
    point2.y = mouse.y;
    working.points.push({ x1: point1.x, y1: point1.y, x2: point2.x, y2: point2.y });
    point1 = {};
    point2 = {};
    draw(cntxt, working);
  } else {
    draw(cntxt, working);
    point1 = {};
  }
};

var base_img = function(cntxt, url) {
  cntxt.beginPath();
  cntxt.fillStyle = working.fg_color;
  cntxt.arc(50, 50, 10, 0, Math.PI * 2);
  cntxt.fill();
  
  var draw_base_img = function(cntxt, url) {
    draw_base_img = new Image ();
    draw_base_img.src = '../img/tree1.png';
    draw_base_img.onload = function(){
      cntxt.drawImage(draw_base_img);
    }
    
    draw_base_img();
  }

var tree_limb = function(cntxt, points) {
  cntxt.beginPath();
  cntxt.lineWidth = 10;
  cntxt.lineCap = 'round';
  cntxt.strokeStyle = working.fg_color;
  cntxt.moveTo(points.x1, points.y1);
  cntxt.lineTo(points.x2, points.y2);
  cntxt.stroke();
};

var draw = function(cntxt, cur_img) {
  clear(cntxt);
  // draw base image
  base_img(cntxt, '../img/tree.png');

  // array of points, draws a single thick line per point set
  for (var i = 0; i < cur_img.points.length; i++) {
    tree_limb(cntxt, cur_img.points[i]);
  }
};

var clear = function(cntxt) {
  cntxt.fillStyle = working.bg_color;
  cntxt.fillRect(0, 0, cntxt.canvas.width, cntxt.canvas.height);
};

var reset_current = function(){
  working.points = [];
  console.log('reset');
  draw(ctx);
};
