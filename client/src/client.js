//https://www.youtube.com/watch?v=P2i11xnrpNI

const writeEvent = (text) => {
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

    sock.emit('message', text);
};

/*const placeEgg = (text) => {
    document.getElementById('color').textContent = "red";
    const box = document.querySelector(text);
    box.classList.add('red');
};*/

writeEvent('Welcome to RPS');

const sock = io();
//sock.on('message', writeEvent);
//sock.on('red', placeEgg);
sock.on('message', function(index) {
    document.getElementById('color').textContent = index;
    if (index !== "Hi, you are connected"){
        console.log(index);

        const box = document.getElementById(index);
        box.classList.add('red');
    }

});


document
    .querySelector('#chat-form')
    .addEventListener('submit', onFormSubmitted);


// ------------------------ mouse position -----------
window.addEventListener('mousemove', function (e){
    document.getElementById('x-value').textContent = e.x;
    document.getElementById('y-value').textContent = e.y;

});


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
            sock.emit('message', index);
        }
        else{
            square.classList.add('blue');
            //sock.emit('message', 'blue');
        }
        count++;
    }

});