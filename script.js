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
let flag =0
// var activeArr = [];
let working ='';
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
    board.addEventListener('mouseup', stopDrawing);

function initialXandY(e){
    if (pencil_dropdown_el.classList.contains('active')) {
        let x = e.clientX;
        let y = e.clientY; 
        ctx.moveTo(x,y);
        console.log(x,y);
    }
}

function lineto(e){
    if (pencil_dropdown_el.classList.contains('active')) {
        let domRect = board.getBoundingClientRect();
    let final_x = e.clientX -domRect;
    let final_y = e.clientY -domRect;
    // final_x =x;
    // final_y =y;
    ctx.lineTo(final_x, final_y);
    ctx.stroke()
    console.log(final_x,final_y);
    }
}

function stopDrawing(){
    ctx.moveTo(0, 0);
    ctx.lineTo(0,0);
}