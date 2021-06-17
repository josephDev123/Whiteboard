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
    }
    active = 'pencil';
    pencil_dropdown_el.classList.add('active'); 
    if (active !='pencil') {
        active='';
    }
    
    if (active ==='pencil') {
        board.addEventListener('mousedown', initialXandY);
    }else{
        
    }
  

}

// active eraser function
function activeEraser(e){
    if(active !=''&& active === 'pencil'){
        pencil_dropdown_el.classList.remove('active');
    }
   
    active ='eraser';
    if(active === 'eraser'){
        eraser_el.classList.add('active'); 
    }else{
        active ='';
    }
}

//TO GET THE INITIAL CO-ORDINATE X,Y VALUES
function initialXandY(e){
    let x = e.clientX;
    let y = e.clientY; 
    console.log(x, y);
}

