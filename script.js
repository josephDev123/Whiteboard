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

board.width = window.innerWidth - 10;
board.height = window.innerHeight - 10;

//default width and color of pencil
let pencil_width = pencil_width_el.value; 
let pencil_color = pencil_color_el.value;
ctx.lineWidth = pencil_width;
ctx.styleStroke = pencil_color;

//default width of eraser
let eraser_width = eraser_width_el.value;
ctx.lineWidth= eraser_width;

//change pencil color 
pencil_color_el.oninput = (e)=>{
    ctx.styleStroke= e.target.value;
}

//change pencil width 
pencil_width_el.oninput = (e)=>{
    ctx.lineWidth= e.target.value; 
}

//change eraser width
eraser_width_el.oninput = (e)=>{
    ctx.lineWidth= e.target.value;  
}

//click on pencil
pencil_dropdown_el.addEventListener('click', activePencil)

//clicking on eraser
eraser_el.addEventListener('click', activeEraser)

// active pencil function
function activePencil(e){
    if(active !='' && active === 'eraser'){
        eraser_el.classList.remove('active');
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
    if(active !=''&& active === 'pencil'){
        pencil_dropdown_el.classList.remove('active');
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
    window.addEventListener('mouseup', stopDrawing);

function initialXandY(e){
    if (pencil_dropdown_el.classList.contains('active')) {
       isdrawing =true;
       initial_x = e.clientX;
       initial_y = e.clientY; 
        
        // let x = e.clientX;
        // let y = e.clientY; 
        // ctx.beginPath();
        // ctx.moveTo(x,y);
        // console.log(x,y);
    }
}

function lineto(e){
    if (pencil_dropdown_el.classList.contains('active')) {
        if(isdrawing==true){
          drawingLine(initial_x, initial_y, e.clientX, e.clientY);
          initial_x = e.clientX;
          initial_y = e.clientY;
        }
    // let final_x = e.clientX;
    // let final_y = e.clientY;
    // ctx.lineTo(final_x, final_y);
    // ctx.stroke()
    // console.log(final_x,final_y);
    }
}

function stopDrawing(e){
    // if (pencil_dropdown_el.classList.contains('active')) {
    // ctx.styleStroke = '';
    // ctx.moveTo(0,0);
    // ctx.lineTo(0,0);
    // working = false;
    // }
    if(isdrawing==true){
        drawingLine(initial_x, initial_y, e.clientX, e.clientY);
        initial_x =0;
        initial_y =0;
        isdrawing =false;
      }

}

function  drawingLine(x, y, X, Y){
    ctx.beginPath();
//   context.strokeStyle = 'black';
//   context.lineWidth = 1;
  ctx.moveTo(x, y);
  ctx.lineTo(X, Y);
  ctx.stroke();
  ctx.closePath();
}