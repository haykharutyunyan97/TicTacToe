let board = document.getElementById("board")
let allSingleBoards = document.getElementsByClassName("singleBoard");
let gamerX = document.getElementById("gamerX");
let gamerO = document.getElementById("gamerO");
let restart = document.getElementById("restart");
let tryAgain = document.getElementById("tryAgain");
let winPage = document.querySelector(".winPage");
let winMessage = document.getElementById("winMessage");


let winCombinations = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],
    ["1", "5", "9"],
    ["3", "5", "7"],
]
let courrentCombinationX = [];
let courrentCombinationO = [];
let haveWinner = false;
let count = 1;



for (let singleBoard of allSingleBoards) {
    singleBoard.addEventListener("click", function (e) {
        if (count % 2) {
            if (!singleBoard.innerText) {
                courrentCombinationX.push(e.target.id);
                singleBoard.innerText = "X";
                singleBoard.classList.add("xStyle")
                count++;
                if (count >= 6) {
                    handleCheckWinner()
                }
            }
        } else {
            if (!singleBoard.innerText){
                courrentCombinationO.push(e.target.id)
                singleBoard.innerText = "O";
                singleBoard.classList.add("oStyle")
                count++;
                if (count >= 6) {
                    handleCheckWinner()
                }
            }
        }
        handleDraw();
    })
}

function handleCheck(arr, whoWins) {
    first: for (let i = 0; i < winCombinations.length; i++) {
        for (let j = 0; j < winCombinations[i].length; j++) {
            if (!arr.includes(winCombinations[i][j])) {
                continue first
            }
        }
        handleShowWinnerName(whoWins);
        haveWinner = true;
    }
}


function handleDraw(){
    if (!haveWinner && count >= 10) {
        winMessage.innerText = "DRAW"
        winPage.className = "visibleWinPage";
        document.body.className = "nonVisible"
    }
}

function handleCheckWinner() {
    handleCheck(courrentCombinationX, "X");
    handleCheck(courrentCombinationO, "O");
}

function handleShowWinnerName(name) {
    winMessage.innerText = `${name} Wins`;
    winPage.className = "visibleWinPage";
    document.body.className = "nonVisible"
}

function handleRestartBtn() {
    courrentCombinationX = [];
    courrentCombinationO = [];
    for (let cell of board.children) {
        cell.innerText = "";
        cell.classList.remove("xStyle");
        cell.classList.remove("oStyle")
    }
    count = 1;
    haveWinner = false;
};


function handleTryAgainBtn () {
    winPage.className = "winPage";
    document.body.classList.remove("nonVisible")
    courrentCombinationX = [];
    courrentCombinationO = [];
    for (let cell of board.children) {
        cell.innerText = "";
        cell.classList.remove("xStyle");
        cell.classList.remove("oStyle")
    }
    count = 1;
    haveWinner = false;
}

restart.addEventListener("click", handleRestartBtn) 
tryAgain.addEventListener("click", handleTryAgainBtn)