//https://www.youtube.com/watch?v=P2i11xnrpNI
/*var username = prompt("Please enter your name:", "Harry Potter");
if (username === null || username === "") {
    username = "Harry Potter";
}*/
username = "hi";

var room = "room";
const sock = io();
sock.emit('join', room);

const writeEvent = (text) => {
    console.log("received " + text);

    // <ul> element
    const parent = document.querySelector('#events');

    // <li> element
    const el = document.createElement('li');
    el.innerHTML = text;

    parent.appendChild(el);
};

const onFormSubmitted = (e) => {
    e.preventDefault();

    const input = document.querySelector('#chat');
    const text = input.value;
    input.value = '';

    console.log('message room ' + text +"  " + room);
    sock.emit('message room', text, room);
};

document
    .querySelector('#chat-form')
    .addEventListener('submit', onFormSubmitted);

writeEvent('Welcome ' + username);
sock.on('message', writeEvent);




// ----------------------- receiving red or blue
const red = (index) => {
    const box = document.getElementById(index);
    box.classList.add('red');
    count++;
    array[index] = 1;
};

const blue = (index) => {
    const box = document.getElementById(index);
    box.classList.add('blue');
    count++;
    array[index] = 2;
};

sock.on('red', red);
sock.on('blue', blue);
// ----------------------------

//----------- JOINING / LEAVING ROOM ------------------
document.querySelector('#room1').addEventListener('click', function(e){
    changeroom("room1")
});
document.querySelector('#room2').addEventListener('click', function(e){
    changeroom("room2")
});
document.querySelector('#room3').addEventListener('click', function(e){
    changeroom("room3")
});

function changeroom(joiningroom){
    sock.emit('leave', room);
    room = joiningroom;
    sock.emit('join', room);
    const myNode = document.getElementById("grid");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }
    count = 0;
    color = "";
    color_val = "-1";
    squares = [];
    array = [];
    document.getElementById('color').textContent = "";
    document.getElementById('room').textContent = joiningroom;
    createBoard();
}
//-----------------------------------------------

var color = "";
var color_val = "-1";

//------------- Choose your color ------------
document.querySelector('#redplayer').addEventListener('click', function(e){
    if (color === "blue"){
        alert("YOU ARE ALREADY BLUE!")
    }
    else{
        color = "red";
        color_val = 0;
        document.getElementById('color').textContent = "red";

    }
});
document.querySelector('#blueplayer').addEventListener('click', function(e){
    if (color === "red"){
        alert("YOU ARE ALREADY RED!")
    }
    else{
        color = "blue";
        color_val = 1;
        count++;
        document.getElementById('color').textContent = "blue";

    }
});

//------------------------------------
const grid = document.querySelector('.grid');
let width = 15;
let squares = [];
let count = 0;
let array = [];

//create Board
function createBoard() {
    for (let i = 0; i < width*width; i++){
        console.log("creating...");
        const square = document.createElement('div');
        square.setAttribute('id', i);
        grid.appendChild(square);
        squares.push(square);
        array.push(0);

        square.addEventListener('click', function(e) {
            console.log("color_val: " + color_val);
            console.log("count: " + count);
            if (count % 2 === color_val && square.classList !== 'red' && square.classList !== 'blue'){
                click(square);
            }
        })
    }
}


function click(square) {
    const index = squares.indexOf(square);
    sock.emit(color, index, room);
    /*if (count % 2 === 0){
        //square.classList.add('red');
        sock.emit('red', index, room);
    }
    else{
        //square.classList.add('blue');
        sock.emit('blue', index, room);
    }
    count++;*/
}
//------------------------------------







/*
// https://www.youtube.com/watch?v=W0No1JDc6vE
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let width = 15;
    let squares = [];
    let count = 0;

    //create Board
    function createBoard() {
        for (let i = 0; i < width*width; i++){
            const square = document.createElement('div');
            square.setAttribute('id', i);
            grid.appendChild(square);
            squares.push(square);

            square.addEventListener('click', function(e) {
                click(square)
            })
        }
    }

    createBoard();

    function click(square) {
        if (count % 2 === 0){
            //square.classList.add('red');
            const ind = squares.indexOf(square);
            const index = ind;
            sock.emit('red', index);
        }
        else{
            square.classList.add('blue');
            //sock.emit('message', 'blue');
        }
        count++;
    }

});*/
