ctx.strokeStyle = "red";
//"DOMContetLoaded tells the browser then the HTML page has finished loading.
document.addEventListener('DOMContentLoaded', function () {
  //Add standard mouse functions.
  var mouse = {
    click: false,
    move: false,
    pos: { x: 0, y: 0 },
    pos_prev: false
  };

  //Get the CanvasWhiteboard elements by it's ID from the HTML page. We need this to be able to draw.
  var canvas = document.getElementById('toolbar');
  //The whiteboard is in 2D with the width and height being the dimensions of the window.

  //The width and height of the whiteboard equals the window width and height.
  canvas.width = width;
  canvas.height = height;

  // Function for when the mouse button is pushed down.
  canvas.onmousedown = function (e) {
    // Set mouse click to true.
    mouse.click = true;
    ctx.strokeStyle = 'red';
  };

  // Function for when the mouse button is lifted.
  canvas.onmouseup = function (e) {
    // Set mouse click to false.
    mouse.click = false;
  };

  // Function to check if the mouse is moved.
  canvas.onmousemove = function (e) {
    //The movement of the mouse at X and Y position is updated everytime the mouse moves.
    //The coordinates equals the coordinates relative to the window height and width.
    mouse.pos.x = e.layerX / width;
    mouse.pos.y = e.layerY / height;

    //The mouse is moving (true).
    mouse.move = true;
  };

  //Listen for draws from other clients.
  socket.on('draw_data', function (data) {
    //The line being drawn equals the data.
    var line = data.line;

    //Begin from the start of the drawn data.
    context.beginPath();

    //The thickness of the line.
    context.lineWidth = 10;

    //Next point to move to from the beginPath.
    context.moveTo(line[0].x * width, line[0].y * height);

    //End point to move to from the beginPath.
    context.lineTo(line[1].x * width, line[1].y * height);

    //The data is then drawn on the whiteboard.
    context.stroke();
  });

  //This loop is where our own drawings are sent to the server for the other clients to see.
  //It checks every 25ms if the mouse is being clicked and moved.
  function mainLoop() {
    if (mouse.click && mouse.move && mouse.pos_prev) {
      //Send our drawing to the server.
      socket.emit('draw_data', { line: [mouse.pos, mouse.pos_prev] });
      //The mouse movement is set to false (reset).
      mouse.move = false;
    }

    //The previous position now equals the position we just were at.
    mouse.pos_prev = { x: mouse.pos.x, y: mouse.pos.y };

    //This is where the 25ms is definend.
    setTimeout(mainLoop, 25);
  }

  //Being called recursively.
  mainLoop();
});

(function(){

  var canvas=document.getElementById("drawingCanvas");
  var context=canvas.getContext("2d");

  var tools=document.getElementById("toolsCanvas");
  var ctx=tools.getContext("2d");
  var canvasOffset=$("#toolsCanvas").offset();
  var offsetX=canvasOffset.left;
  var offsetY=canvasOffset.top;

  var colors=['Red','Green','Blue','Yellow','Orange','Brown','Purple']
  var lightcolors="Yellow|White";
  var colorPickerWidth=25;

  // draw the color picker
  tools.width=colors.length*colorPickerWidth;
  for(var i=0;i<colors.length;i++){
    ctx.fillStyle=colors[i];
    ctx.fillRect(i*colorPickerWidth,0,colorPickerWidth,25);
  }


  // called when the user clicks and picks a color
  function handleMouseDown(e){
    console.log("down");
    var x=parseInt(e.clientX-offsetX);
    var color=colors[parseInt(x/colorPickerWidth)];
    ctx.save();
    ctx.fillStyle=color;
    ctx.fillRect(0,28,tools.width,25);
    ctx.fillStyle="white";
    if(lightcolors.indexOf(color)>-1){ctx.fillStyle="black";}
    ctx.font="16px verdana";
    ctx.fillText("Selected: "+color,10,45);
    ctx.restore();

    context.clearRect(0,0,canvas.width,canvas.height);
    context.fillStyle=color;
    context.font="14px arial";
    context.fillText("fillStyle==your selected color",30,100);
  }

  ("#toolsCanvas").mousedown(function(e){handleMouseDown(e);});


}); 