'use strict';
let board = document.getElementById('canvas');
let ctx = board.getContext('2d');
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

let pencil_dropdown_el = document.getElementById('pencil_dropdown');
let pencil_color_el = document.getElementById('color');
let pencil_width_el = document.getElementById('pencil_width');
let eraser_el = document.getElementById('eraser_dropdown');
let eraser_width_el = document.getElementById('eraser_width');
let trash_el = document.getElementById('trash');
let file_el = document.getElementById('file');
let download_el = document.getElementById('download');

let active = '';
let isdrawing = false;
let working =false;
let initial_x;
let initial_y;
let eraserInitial_x;
let eraserInitial_y;
let isErasing = false;

board.width = window.innerWidth - 10;
board.height = window.innerHeight - 10;

//default width and color of pencil
let pencil_width = pencil_width_el.value; 
let pencil_color = pencil_color_el.value;
// ctx.lineWidth = pencil_width;
// ctx.strokeStyle = pencil_color;

//default width of eraser
let eraser_width = eraser_width_el.value;
// ctx.lineWidth= eraser_width;

//change pencil color 
pencil_color_el.oninput = (e)=>{
    pencil_color = e.target.value;
    // ctx.strokeStyle =  e.target.value;
    // console.log(pencil_color);
}

//change pencil width 
pencil_width_el.oninput = (e)=>{
    pencil_width =e.target.value
    // ctx.lineWidth= pencil_width; 
}

//change eraser width
eraser_width_el.oninput = (e)=>{
    eraser_width = e.target.value;
    // ctx.lineWidth=eraser_width ;  
}

//click on pencil
pencil_dropdown_el.addEventListener('click', activePencil)

//clicking on eraser
eraser_el.addEventListener('click', activeEraser)

// active pencil function
function activePencil(e){
    if(active !='' && active === 'eraser' || trash_el.firstElementChild.firstElementChild.classList.contains('active_delete')){
        eraser_el.classList.remove('active');
        trash_el.firstElementChild.firstElementChild.classList.remove('active_delete')
        active = '';
        working =false;
    }


  working =true
    if (working === true) {
        pencil_dropdown_el.classList.add('active'); 
        active = 'pencil';
    }else {
        pencil_dropdown_el.classList.remove('active');
        active='';
    }
}

// active eraser function
function activeEraser(e){
    if(active !=''&& active === 'pencil' || trash_el.firstElementChild.firstElementChild.classList.contains('active_delete')){
        pencil_dropdown_el.classList.remove('active');
        trash_el.firstElementChild.firstElementChild.classList.remove('active_delete')
        active ='';
        working =false;
    }
    working =true;

    if(working ==true){
        active ='eraser';
        eraser_el.classList.add('active'); 
    }else{
        eraser_el.classList.remove('active'); 
        active ='';
    }
}


    board.addEventListener('mousedown', initialXandY);
    board.addEventListener('mousemove', lineto);
    board.addEventListener('mouseup', stopDrawing);

function initialXandY(e){
    if (pencil_dropdown_el.classList.contains('active')) {
       isdrawing =true;
       initial_x = e.offsetX;
       initial_y = e.offsetY; 
       

    }
}

function lineto(e){
    if (pencil_dropdown_el.classList.contains('active')) {
        if(isdrawing==true){
          drawingLine(initial_x, initial_y, e.offsetX, e.offsetY, pencil_color, pencil_width);
          initial_x = e.offsetX;
          initial_y = e.offsetY;
        }
    }
}

function stopDrawing(e){
    if(isdrawing==true){
        drawingLine(initial_x, initial_y, e.offsetX, e.offsetY, pencil_color, pencil_width);
        initial_x =0;
        initial_y =0;
        isdrawing =false;
      }

}

function  drawingLine(x, y, X, Y, color, width){
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(X, Y);
    ctx.strokeStyle =color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.closePath();
 }


//erasing the drawing on the canvas content
board.addEventListener('mousedown', initialEraserXandY);
board.addEventListener('mousemove', EraserLineTo);
board.addEventListener('mouseup', stopErase);

function initialEraserXandY(e){
    if (eraser_el.classList.contains('active')) {
        isErasing =true;
        eraserInitial_x = e.offsetX;
        eraserInitial_y = e.offsetY;
        ctx.strokeStyle = 'white';
    }
}

function EraserLineTo(e){
    if (eraser_el.classList.contains('active')) {
    if (isErasing ===true) {
        eraseCanvasContent(eraserInitial_x, eraserInitial_y, e.offsetX, e.offsetY, 'white',eraser_width);
        eraserInitial_x = e.offsetX;
        eraserInitial_y = e.offsetY;
    }
}
}

function stopErase(e){
    if (eraser_el.classList.contains('active')) {
    if (isErasing ==true) {
        eraseCanvasContent(eraserInitial_x, eraserInitial_y, e.offsetX, e.offsetY, 'white', eraser_width);
        // eraserInitial_x = 0;
        // eraserInitial_y = 0;
        isErasing =false;
    }
}
}

function eraseCanvasContent(x1,y1,x2,y2, color, eraserWidth){
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineWidth =eraserWidth;
    ctx.stroke();
    ctx.closePath();

}

//display textarea on clicking the textarea content btn in the navbar
let textarea_btn = document.querySelector('.fa-commenting');
textarea_btn.onclick =()=>{
    if ( document.querySelector('#mydiv').style.display == 'none') {
        textarea_btn.classList.add('active');
        document.querySelector('#mydiv').style.display = 'block';
    }else{
        textarea_btn.classList.remove('active');
        document.querySelector('#mydiv').style.display = 'none';
    }
    
}


//delete section
trash_el.onclick = ()=>{
    if (pencil_dropdown_el.classList.contains('active') || eraser_el.classList.contains('active')) {
        pencil_dropdown_el.classList.remove('active');
        eraser_el.classList.remove('active'); 
    }
    let trashchild = trash_el.firstElementChild.firstElementChild;
        trashchild.classList.add('active_delete')
        ctx.clearRect(0,0, board.width, board.height);
}



//Make the content text DIV element draggagle:
dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
    