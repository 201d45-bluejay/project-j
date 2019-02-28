'use strict';

var event_target = document.getElementById('drawing_pad');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

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

var click_handler = function(event) {
  event.preventDefault();
  if (event.target.id === 'canvas') {
    canvas_click(event);
  }
  else if (event.target.id === 'reset_button') {
    reset_current();
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
var init = function () {
  event_target.addEventListener('click' , click_handler , false);

  retrieve();

  draw();
};

init();
