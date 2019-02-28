'use strict';


var header = document.getElementById("header"); //get header
var stickyHeader = header.offsetTop; //get the Offset position of the nav bar
function stickyFunction(){ //adds the sticky class to the header when you reach the scoll position and removes when scrolling is done
  if (window.pageYOffset > stickyHeader){
    header.classList.add("stickyHeader");
  } else{
    header.classList.remove("stickyHeader");
  }
}
