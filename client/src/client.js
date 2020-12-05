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


// creating rooms right now
const createRoom = (e) => {
    e.preventDefault();

    const create_input = document.querySelector('#input_create');
    const create_code = create_input.value;
    create_input.value = '';

    console.log("Create code: " + create_code);
    sock.emit('create_attempt', sock.id, create_code);
};

document.querySelector('#create-form').addEventListener('submit', createRoom);

const create = (code) => {
    changeroom(code);
};

const create_error = (text) => {
    alert("The room with the code " + text + " already exists. \n Make a room with different code.");
};

sock.on('creating', create);
sock.on('create_error', create_error);

// join room
const joinRoom = (e) => {
    e.preventDefault();

    const join_input = document.querySelector('#input_join');
    const join_code = join_input.value;
    join_input.value = '';

    console.log("Join code: " + join_code);
    sock.emit('join_attempt', sock.id, join_code);
};


const join = (code) => {
    changeroom(code);
};

const join_error = (text) => {
    alert("The room with your code " + text + " does not exist. ")
};

document.querySelector('#join-form').addEventListener('submit', joinRoom);
sock.on('joining', join);
sock.on('join_error', join_error);

const left = (e) => {
    alert("The opponent has left. The board will be reset.");
    changeroom(room);
};
sock.on('left', left);
sock.on('disconnection', left);

// ----------------------- receiving red or blue
const red = (index) => {
    const box = document.getElementById(index);
    box.classList.add('red');
    count++;
    console.log(array);
    array[Math.floor(index/15)][index%15] = 1;
    if (checkWin() === 1){
        alert("red has won");
    }
};

const blue = (index) => {
    const box = document.getElementById(index);
    box.classList.add('blue');
    count++;
    array[Math.floor(index/15)][index%15] = 2;
    if (checkWin() === 2){
        alert("blue has won");
    }
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
    console.log("attempting to join " + joiningroom);
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
    array = Array(15).fill().map(() => Array(15).fill(0));
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
        document.getElementById('color').textContent = "blue";

    }
});

//------------------------------------
const grid = document.querySelector('.grid');
let width = 15;
let squares = [];
let count = 0;
let array = Array(15).fill().map(() => Array(15).fill(0));


//create Board
function createBoard() {
    for (let i = 0; i < width*width; i++){
        console.log("creating...");
        const square = document.createElement('div');
        square.setAttribute('id', i);
        grid.appendChild(square);
        squares.push(square);

        square.addEventListener('click', function(e) {
            console.log("color_val: " + color_val);
            console.log("count: " + count);
            if (count % 2 === color_val && square.classList !== 'red' && square.classList !== 'blue'){
                click(square);
                //updateArrayofColors();
                /*if(checkWin() !== 0){
                    if (checkWin() === 1){
                        alert("red has won");
                    }
                    else{
                        alert("blue has won");
                    }
                }*/
            }
        })
    }
    //updateArrayofColors();
}



/*function updateArrayofColors(){
    array = [];
    for (let i = 0; i < width; i++){
        let temp = [];
        for (let j = 0; j < width; j++){
            if(squares[15 * i + j].classList.contains("red")){
                temp.push(1);
            }
            else if(squares[15 * i + j].classList.contains("blue")){
                temp.push(2);
            }
            else{
                temp.push(0);
            }
        }
        array.push(temp);
    }
    console.log(array);
}*/

function checkWin(){
    let bool = false;
    for (let i = 0; i < width; i++){
        for (let j = 0; j < width; j++){
            if(array[i][j] === 0){
                continue;
            }
            if(i <= width - 5){
                bool = bool || checkDown(j, i, array[i][j]);
            }
            if(i >= 4){
                bool = bool || checkUp(j, i, array[i][j]);
            }
            if(j <= width - 5){
                bool = bool || checkRight(j, i, array[i][j]);
            }
            if(j >= 4){
                bool = bool || checkLeft(j, i, array[i][j]);
            }
            if((j <= width - 5 ) && (i >= 4)){
                bool = bool || check45(j, i, array[i][j]);
            }
            if((i >= 4) && (j >= 4)){
                bool = bool || check135(j, i, array[i][j]);
            }
            if((i <= width - 5 ) && (j >= 4)){
                bool = bool || check225(j, i, array[i][j]);
            }
            if((j <= width - 5 ) && (i <= width - 5)){
                bool = bool || check315(j, i, array[i][j]);
            }
            if(bool === true){
                return array[i][j]
            }
        }
    }
    return 0;

}

function checkDown(x, y, color){
    for (let i = y + 1; i < y + 5; i++){
        if(array[i][x] !== color){
            return false;
        }
    }
    return true;
}

function checkUp(x, y, color){
    for (let i = y - 1; i > y - 5; i--){
        if(array[i][x] !== color){
            return false;
        }
    }
    return true;

}
function checkRight(x, y, color){
    for (let i = x + 1; i < x + 5; i++){
        if(array[y][i] !== color){
            return false;
        }
    }
    return true;
}
function checkLeft(x, y, color){
    for (let i = x - 1; i > x - 5; i--){
        if(array[y][i] !== color){
            return false;
        }
    }
    return true;

}
function check45(x, y, color){
    for (let i = y - 1; i > y - 5; i--){
        x++;
        if(array[y][x] !== color){
            return false;
        }
    }
    return true;

}
function check135(x, y, color){
    for (let i = y - 1; i > y - 5; i--){
        x--;
        if(array[y][x] !== color){
            return false;
        }
    }
    return true;

}
function check225(x, y, color){
    for (let i = y + 1; i < y + 5; i++){
        x--;
        if(array[y][x] !== color){
            return false;
        }
    }
    return true;
}
function check315(x, y, color){
    for (let i = y + 1; i < y + 5; i++){
        x++;
        if(array[y][x] !== color){
            return false;
        }
    }
    return true;
}


function click(square) {
    const index = squares.indexOf(square);
    sock.emit(color, index, room);

}
//------------------------------------

// https://www.youtube.com/watch?v=W0No1JDc6vE


