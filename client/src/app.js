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
            squares.push(square)

            square.addEventListener('click', function(e) {
                click(square)
            })
        }
    }

    createBoard();

    function click(square) {
        if(square.classList.contains('red') || square.classList.contains('blue')){

        }
        else if (count % 2 === 0){
            square.classList.add('red');
        }
        else{
            square.classList.add('blue');
        }
        count++;
    }

});