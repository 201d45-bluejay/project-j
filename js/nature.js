'use strict'; 

// var edit = document.getElementById('images');
// var download = document.getElementById('download');

// edit.addEventListener('click', function (body){ 
//   console.log(body.target.value);
// });
// download.addEventListener('click', function (body){ 
//   console.log(body.target.value);

// });
/*
    <div>
        <canvas id="canvas1" width="640" height="640"></canvas>
        <div class="natureButtons">
            <a href="" class="btn" name="edit">Edit</a>
            <a href="" class="button" name="download">Download</a>
        </div>
    </div>
// */

var create_frames = function() {
  var target = document.getElementById('flex-grid');
  target.innerHTML = '';

  for (var i = 0; i < 12; i++) {
    var outer_el = document.createElement('div');
    var canvas_el = document.createElement('canvas');
    var div_el = document.createElement('div');
    var a_el = document.createElement('a');

    canvas_el.setAttribute('id', `canvas${i}`);
    canvas_el.setAttribute('width', 640);
    canvas_el.setAttribute('height', 640);
    outer_el.appendChild(canvas_el);

    div_el.className = 'natureButtons';

    a_el.className = 'btn';
    a_el.name = 'edit';
    a_el.textContent = 'Edit';
    div_el.appendChild(a_el);

    a_el = document.createElement('a');
    a_el.className = 'button';
    a_el.name = 'download';
    a_el.textContent = 'Download';
    div_el.appendChild(a_el);

    outer_el.appendChild(div_el);
    target.appendChild(outer_el);
  }
};

var gallery_clicks = function(event) {
  event.preventDefault();
  if (event.target.tagName === 'A') {
    console.log(event.target.name);
  }
};

var target = document.getElementById('flex-grid');
target.addEventListener('click', gallery_clicks);

create_frames();
