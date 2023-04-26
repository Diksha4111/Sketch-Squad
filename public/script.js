let canvas = document.getElementById("canvas");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

var io = io.connect();

let ctx = canvas.getContext("2d");

let x;
let y;
let mouseDown = false;


window.onmousedown = (e) => {
  ctx.moveTo(x, y);
  io.emit('down' , {x,y})
  mouseDown = true;
};

window.onmouseup = (e) => {
  mouseDown = false;
};

io.on('ondraw' , ({x,y}) => {
    ctx.lineTo(x, y);
    ctx.stroke();
})

io.on('ondown' , ({x,y}) => {
    ctx.moveTo(x, y);
})

window.onmousemove = (e) => {
  x = e.offsetX;
  y = e.offsetY;

  if (mouseDown) {
    io.emit("draw", { x,y });
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};
/*const canvas = document.querySelector("canvas"),
toolBtns = document.querySelectorAll(".tool"),
fillColor = document.querySelector("#fill-color"),
sizeSlider = document.querySelector("#size-slider"),
colorBtns = document.querySelectorAll(".colors .option"),
colorPicker = document.querySelector("#color-picker"),
clearCanvas = document.querySelector(".clear-canvas"),
saveImg = document.querySelector(".save-img"),
ctx = canvas.getContext("2d");

// global variables with default value
let prevMouseX, prevMouseY, snapshot,
isDrawing = false,
selectedTool = "brush",
brushWidth = 5,
selectedColor = "#000";


const setCanvasBackground = () => {
    // setting whole canvas background to white, so the downloaded img background will be white
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor; // setting fillstyle back to the selectedColor, it'll be the brush color
}

window.addEventListener("load", () => {
    // setting canvas width/height.. offsetwidth/height returns viewable width/height of an element
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();
});

const drawRect = (e) => {
    // if fillColor isn't checked draw a rect with border else draw rect with background
    if(!fillColor.checked) {
        // creating circle according to the mouse pointer
        return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    }
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

const drawCircle = (e) => {
    ctx.beginPath(); // creating new path to draw circle
    // getting radius for circle according to the mouse pointer
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI); // creating circle according to the mouse pointer
    fillColor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill circle else draw border circle
}

const drawTriangle = (e) => {
    ctx.beginPath(); // creating new path to draw circle
    ctx.moveTo(prevMouseX, prevMouseY); // moving triangle to the mouse pointer
    ctx.lineTo(e.offsetX, e.offsetY); // creating first line according to the mouse pointer
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); // creating bottom line of triangle
    ctx.closePath(); // closing path of a triangle so the third line draw automatically
    fillColor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill triangle else draw border
}

const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX; // passing current mouseX position as prevMouseX value
    prevMouseY = e.offsetY; // passing current mouseY position as prevMouseY value
    ctx.beginPath(); // creating new path to draw
    ctx.lineWidth = brushWidth; // passing brushSize as line width
    ctx.strokeStyle = selectedColor; // passing selectedColor as stroke style
    ctx.fillStyle = selectedColor; // passing selectedColor as fill style
    // copying canvas data & passing as snapshot value.. this avoids dragging the image
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

const drawing = (e) => {
    if(!isDrawing) return; // if isDrawing is false return from here
    ctx.putImageData(snapshot, 0, 0); // adding copied canvas data on to this canvas

    if(selectedTool === "brush" || selectedTool === "eraser") {
        // if selected tool is eraser then set strokeStyle to white 
        // to paint white color on to the existing canvas content else set the stroke color to selected color
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY); // creating line according to the mouse pointer
        ctx.stroke(); // drawing/filling line with color
    } else if(selectedTool === "rectangle"){
        drawRect(e);
    } else if(selectedTool === "circle"){
        drawCircle(e);
    } else {
        drawTriangle(e);
    }

    context.lineTo(event.clientX - canvas.offsetLeft,event.clientY - canvas.offsetTop);
    
}

toolBtns.forEach(btn => {
    btn.addEventListener("click", () => { // adding click event to all tool option
        // removing active class from the previous option and adding on current clicked option
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
    });
});

sizeSlider.addEventListener("change", () => brushWidth = sizeSlider.value); // passing slider value as brushSize

colorBtns.forEach(btn => {
    btn.addEventListener("click", () => { // adding click event to all color button
        // removing selected class from the previous option and adding on current clicked option
        document.querySelector(".options .selected").classList.remove("selected");
        btn.classList.add("selected");
        // passing selected btn background color as selectedColor value
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    });
});

colorPicker.addEventListener("change", () => {
    // passing picked color value from color picker to last color btn background
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click();
});

clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clearing whole canvas
    setCanvasBackground();
});

saveImg.addEventListener("click", () => {
    const link = document.createElement("a"); // creating <a> element
    link.download = `${Date.now()}.jpg`; // passing current date as link download value
    link.href = canvas.toDataURL(); // passing canvasData as link href value
    link.click(); // clicking link to download image
});

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);
*/

//TIMER
function timer(time){
    sendData(score);
    let timeSecond = time;
   
const timeH = document.querySelector("#timer");

displayTime(timeSecond);

const countDown = setInterval(() => {
  timeSecond--;
  displayTime(timeSecond);
  if (timeSecond == 0 || timeSecond < 1) {
    endCount();
    clearInterval(countDown);
  }
}, 1000);

function displayTime(second) {
  const min = Math.floor(second / 60);
  const sec = Math.floor(second % 60);
  timeH.innerHTML = `
  ${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}
  `;
}
function endCount() {
  timeH.innerHTML = "Time out";
}
}


//chooseword
function togglePopup(){
    document.getElementById("popup-1").classList.toggle("active");
}

let check;
//Random word generator
let btn = document.querySelector(".next");
btn.addEventListener('click', function(){
    let arr = [
        "apple",
        "mango",
        "house",
        "ball",
        "tree",
        "computer",
        "juice"
    ];
    let disPlay = document.querySelector('.word');

    disPlay.innerHTML = arr[Math.floor(Math.random()*arr.length)];
    check = disPlay.innerHTML;
    console.log(disPlay.innerHTML);
})
console.log("check = " + check);

//display chosen word

let chosen = document.querySelector(".done");
chosen.addEventListener('click', function(){
    togglePopup();
    let disPlay = document.querySelector('.word');
    let word = document.querySelector('.chosen');
    let w = disPlay.innerHTML;
    let text = w.charAt(0) + ' _ '.repeat(w.length - 2) + w.charAt(w.length - 1);
    h1(word,w);
    let timeSecond=60;
    io.emit('time',timeSecond);
    timer(timeSecond);
    

})

function h1(word,w){
    let disPlay = document.querySelector('.word');
    disPlay.innerHTML=w;
    let text = w.charAt(0) + ' _ '.repeat(w.length - 2) + w.charAt(w.length - 1);
    word.innerHTML = text;
    io.emit("h1",w);
}

//JOIN

function join(){
        window.location.href = './GamingArena.html';
}


//chat
let name;
let score = 0;
let update={
    user: name,
    score: score
}
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do{
    name = prompt('Please enter your name: ')
} while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})


function check1(message){
    let disPlay = document.querySelector('.word');
    let w = disPlay.innerHTML.trim();
    let m=message.trim();
    let x = update.score; 
    let crct = {
        user: name,
        message: name+' guessed correct answer'
    }
    if(m === w){
        let y = x+10;
        let up = {
            user: name,
            score: y
        }
        update=up;
        correct(crct,"correct")
        io.emit('correct', crct)
        updatescore(update);
        io.emit('update',y);
    }
}

//correct
function correct(msg,type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

//Messages
function sendMessage(message) {
   
    let msg = {
        user: name,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()
    console.log(message);

    // Send to server 
    io.emit('message', msg)
    check1(message);
   

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}


//score 
function sendData(score) {
   
    let scr = {
        user: name,
        score: score
    }
    // Append setTimeout(
        setTimeout(
    updateuser(scr, 'score'),10000);
    

    // Send to server 
    
    io.emit('score',scr)

}


let scoreArea = document.querySelector('.players');

function updateuser(scr,type1){

    let uDiv = document.createElement('div')
    let className = type1
    uDiv.classList.add(className, 'score'+scr.user)

    let markup = `
        <h4>${scr.user}</h4>
        <p>Score: ${scr.score}</p>
    `
    uDiv.innerHTML = markup
    scoreArea.appendChild(uDiv)

}

//sendData(score)


function updatescore(update){
    let y = document.querySelector(".score"+update.user);
    y.innerHTML = `
        <h4>${update.user}</h4>
        <p>Score: ${update.score}</p>
    `

}

// Recieve messages 
io.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})
io.on('correct', (crct) => {
    correct(crct, 'correct')
    scrollToBottom()
})
io.on('h1',(w)=>{
    let word = document.querySelector('.chosen');
    h1(word,w);
})

io.on('time',(timeSecond)=>{
    timer(timeSecond);
})
io.on('score',(score)=>{
    updateuser(score,'score');
})
io.on('update',(y)=>{
    updatescore(update);
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}
 
