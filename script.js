// query selectors to pull info from html
const GameBoard = document.querySelector('#game-board');
const Infodisplay = document.querySelector('#info');

// Initial gameboard
const StartCells= [ "","","",
                    "","","",
                    "","",""]

let go = 'circle';
Infodisplay.textContent= "Circle Goes First";

function checkScore(){
    // Collects all element that have the square class
    const AllSquares = document.querySelectorAll(".square");
    // every winning combo in tic tac toe
    const WinningCombos = [
        [0,1,2], [3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ]
    WinningCombos.forEach(array => {
        // for each of the winning combos, if every square (allsquares) in the game board that matches the id in the combo with the class square
        let circleWins = array.every(cell =>
            // you pass the values of the winning combos as the cell id, and you check its first childs class is circle
            AllSquares[cell].firstChild?.classList.contains('circle'));

            if (circleWins){
                // if the statement above is true display win
                Infodisplay.textContent = "Circle wins!";

                //a node is an individual element of the document, we clone the node for all the squares so they are all the same, the true param means it will perform a deep clone
                // we remove the event listeners so we cant play after the game is over
                AllSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
                return;
            }
        
    });
    // repeat for cross
    WinningCombos.forEach(array => {
        let crossWins = array.every(cell =>
            AllSquares[cell].firstChild?.classList.contains('cross'));

            if (crossWins){
                Infodisplay.textContent = "Cross wins!";

                AllSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
                return;
            }
        
    });
}

function addGo(e){
    const GoDisplay = document.createElement('div');
    GoDisplay.classList.add(go);
    e.target.append(GoDisplay);

    // if go is strictly equal to 'circle, then change expression is true and the variable is assigned 'cross', if false then set to circle
    go = go === 'circle' ? 'cross' : 'circle';

    Infodisplay.textContent = "it is now " + go + "'s turn.";
    // end the event listener
    e.target.removeEventListener('click',addGo);
    checkScore()
}

function createBoard(){
    StartCells.forEach((_cell, i) => {
        //for each of the cells in the grid create a div within them and add a class 'square'
        const CellElement = document.createElement('div');
        CellElement.classList.add('square')
        CellElement.id= i; //give each cell a unique id
        CellElement.addEventListener('click',addGo);
        GameBoard.append(CellElement); //add the cell element to the game board
    })
}

createBoard()