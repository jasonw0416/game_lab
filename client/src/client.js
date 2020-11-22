//https://www.youtube.com/watch?v=P2i11xnrpNI

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

writeEvent('Welcome to RPS');

var room = "room";


const sock = io();
sock.emit('join', room);

sock.on('message', writeEvent);

const red = (index) => {
    if (index !== "Hi, you are connected"){
        console.log(index);

        const box = document.getElementById(index);
        box.classList.add('red');
    }
};

const blue = (index) => {
    if (index !== "Hi, you are connected"){
        console.log(index);

        const box = document.getElementById(index);
        box.classList.add('blue');
    }
};

sock.on('red', red);
sock.on('blue', blue);

document.querySelector('#room1').addEventListener('click', function(e){
    room = "room1";
    console.log('CLICKED' + room);
    sock.emit('join', room);
});





//------------------------------------

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
    const index = squares.indexOf(square);
    if (count % 2 === 0){
        //square.classList.add('red');
        sock.emit('red', index);
    }
    else{
        //square.classList.add('blue');
        sock.emit('blue', index);
    }
    count++;
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
