const container = document.querySelector(".container");
const buttons = document.querySelectorAll(".item");
const announce = document.querySelector(".players");

const player1 = {
    title: "Player 1",
    marker: "x"
}

const player2 = {
    title: "Player 2",
    marker: "o"
}

let currentPlayer = player1;

const winningConditions = [
    [0, 1, 2],
    [0, 3, 6],
    // new ones
    [0, 1, 2, 4],
    [0, 1, 2, 5],
    [0, 1, 2, 8],
    [0, 1, 3, 6],
    [0, 1, 4, 7],
    [0, 2, 4, 6],
    [0, 2, 4, 8],
    [0, 3, 4, 5],
    [0, 3, 4, 8],
    [0, 3, 6, 7],
    [0, 3, 5, 6],
    [0, 2, 3, 6],
    [0, 3, 4, 6],
    [0, 4, 5, 8],
    [0, 4, 6, 8],
    [0, 4, 7, 8],
    [0, 1, 2, 7],
    [1, 2, 5, 8],
    [1, 6, 7, 8],
    [1, 3, 4, 5],
    [1, 3, 4, 7],
    [1, 4, 5, 7],
    [1, 4, 6, 7],
    [1, 4, 7, 8],
    [1, 2, 4, 6],
    [2, 3, 4, 5],
    [2, 6, 7, 8],
    [2, 4, 5, 8],
    [2, 4, 6, 8],
    [3, 4, 5, 6],
    [3, 4, 5, 7],
    [4, 6, 7, 8],
    [0, 2, 3, 5, 6],
    [0, 2, 3, 4, 6],
    [0, 2, 4, 5, 8],
    [0, 2, 4, 6, 7],
    [0, 1, 2, 3, 7],
    [0, 1, 2, 3, 8],
    [1, 2, 4, 5, 6],
    [2, 3, 4, 5, 7],
    [2, 3, 4, 6, 7],
    [3, 4, 6, 7, 8],
    [0, 1, 4, 7, 8],
    [2, 3, 4, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [2, 4, 5, 6],
    [2, 5, 7, 8],
    [3, 4, 5],
    [6, 7, 8],
];

let firstArray = [];
let secondArray = [];
let moveCounter = 0;
let isClicked = true;
let isNotDraw = true;

buttons.forEach(
    btn => {
        btn.addEventListener("click", e => {
            const element = e.currentTarget;

            if (element.textContent !== "") {
                return; 
            }

            element.textContent = currentPlayer.marker;

            // Disable the button after it has been clicked
            disableBtn(element);

            (function () {
                if (currentPlayer === player1) {
                    currentPlayer = player2;
                } else {
                    currentPlayer = player1;
                }
            })();


            // This id merely serves as the unique identifier of the buttons
            const id = Number(element.dataset.id);
            
            // firstArray.push(id);
            whosPlaying(id);
            moveCounter++;
            // match the given array with the array of the individual players
            setTimeout(() => {
                for (let i = 0; i < winningConditions.length; i++) {
                    if (equalArray(firstArray, winningConditions[i])) {
                        announce.textContent = "Player 2 Won!";
                        isNotDraw = false;

                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    } else if (equalArray(secondArray, winningConditions[i])) {
                        announce.textContent = "Player 1 Won!";
                        isNotDraw = false;

                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    }
                }
                
                if (moveCounter === 9 && isNotDraw == true) {
                    announce.textContent = "It is a draw";
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }

            }, 45)
    }
    )
    });

    function disableBtn(element) {
        element.disabled = true;
    }

    function enableBtn(element) {
        element.disabled = false;
    }


function equalArray (a, b) {
    if (a.length === b.length) {
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
          return false;
        }
      }
      return true;
    } else {
        return false;
    }
  }


function whosPlaying (id) {
    if (currentPlayer === player1) {
        firstArray.push(id);
        firstArray.sort();
        announce.textContent = "Player 1's turn";
    } else {
        secondArray.push(id);
        secondArray.sort();
        announce.textContent = "Player 2's turn";
    }
}