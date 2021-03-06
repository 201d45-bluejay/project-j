'use strict'; 

var target = document.getElementById('flex-grid');

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
  target.innerHTML = '';

  for (var i = 0; i < 12; i++) {
    var outer_el = document.createElement('div');
    var canvas_el = document.createElement('canvas');
    var div_el = document.createElement('div');
    
    canvas_el.id = `canvas${i}`;
    canvas_el.width = 640;
    canvas_el.height = 640;
    outer_el.appendChild(canvas_el);
    
    div_el.className = 'natureButtons';
    
    var a_el = document.createElement('a');
    a_el.className = 'btn';
    a_el.name = 'edit';
    a_el.id = `edit${i}`;
    a_el.textContent = 'Edit';
    div_el.appendChild(a_el);
    
    a_el = document.createElement('a');
    a_el.className = 'button';
    a_el.name = 'download';
    a_el.id = `download${i}`;
    a_el.textContent = 'Download';
    div_el.appendChild(a_el);
    
    outer_el.appendChild(div_el);
    target.appendChild(outer_el);
    var cntxt = canvas_el.getContext('2d');
    draw(cntxt, data.images[i]);
  }
};

var edit = function(idx) {
  console.log('edit', idx);
  var edit_url = './index.html';
  data.current = idx;
  data.newImg = false;
  window.location.replace(edit_url);
  localStorage.setItem('nature_images', JSON.stringify(data));
};

var download = function(e, idx) {
  var dl_canvas = document.getElementById(`canvas${idx}`);
  var dataUrl = dl_canvas.toDataURL('image/png');
  console.log(e.target);
  e.target.href = dataUrl;
  e.target.download = 'download_image';
};

var gallery_click_handler = function(event) {
  var name = event.target.name;
  var id = event.target.id;
  var idx;
  switch (name) {
  case 'edit':
    idx = id.slice('edit'.length);
    edit(idx);
    break;
  case 'download':
    idx = id.slice('download'.length);
    download(event, idx);
    break;
  }
};

var nature_init = function() {
  target.addEventListener('click', gallery_click_handler);

  retrieve();

  create_frames();
};

nature_init();
