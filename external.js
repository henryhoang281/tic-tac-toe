const boxEls = document.querySelectorAll('.box');
const restartBtn = document.querySelector('.restart')
let playerO = 'O';
let playerX = 'X';
let displayTurn = document.querySelector('.displayTurn')
let displayWinner = document.querySelector('.playerText')

function clickBoxes() {
boxEls.forEach(box => {
    box.addEventListener('click', handleClick, {once: true})
})
}
clickBoxes();

function handleClick(e) {
    const playerDisplay = document.createElement('div')
    playerDisplay.classList.add(playerO)
    e.target.append(playerDisplay)
    playerO = playerO === 'O' ? 'X' : 'O'
    displayTurn.textContent = playerO + "'s turn"
    e.target.removeEventListener('click', handleClick)
    checkWin()
    checkDraw()
}

function checkWin() {   
    const winCondition = [
        [0, 1, 2], 
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ]

    winCondition.forEach(array => {
        const circleWin = array.every(cell =>
            boxEls[cell].firstChild?.classList.contains('O'))
        if(circleWin){
            displayWinner.style.fontSize = '40px';
            displayWinner.textContent = 'O wins';          
        }
    })

    winCondition.forEach(array => {
        const crossWin = array.every(cell =>
            boxEls[cell].firstChild?.classList.contains('X'))
        if(crossWin){
            displayWinner.style.fontSize = '40px';
            displayWinner.textContent = 'X wins'
        }
    })
}

function checkDraw (){
    boxEls.forEach(box => box.textContent !== '');
    displayWinner.textContent = 'Draw'
}

function restartGame(){
    boxEls.forEach(box => box.textContent = '');
    clickBoxes();
    playerO = playerO === 'O' ? 'X' : 'O'
    displayWinner.textContent = 'Tic Tac Toe';
    playerO = 'O';
    displayTurn.textContent = `${playerO}'s turn`;
}


restartBtn.addEventListener('click', restartGame);


