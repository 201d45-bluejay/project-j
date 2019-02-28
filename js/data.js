'use strict';

var data, working;

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

var retrieve = function(){
  debugger;
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
};

var overwrite_check = function(){
  return confirm('overwrite oldest image?');
};

