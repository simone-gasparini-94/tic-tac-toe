const Players = (function() {
    const playerSelector = document.querySelector(".player-selector");
    const playBtn = document.querySelector("#play-btn");
    const inputPlayer1 = document.querySelector("#player1");
    const inputPlayer2 = document.querySelector("#player2");

    let player1, player2, currentPlayer;

    function showSelector() {
        playerSelector.classList.remove("hidden");
    }

    function hideSelector() {
        playerSelector.classList.add("hidden");
    }

    function namePlayer(name, marker) {
        return {
            name,
            marker,
        }
    }

    function resetInputs() {
        inputPlayer1.value = "";
        inputPlayer2.value = "";
    }

    function setPlayers() {
        player1 = namePlayer(inputPlayer1.value || "Player 1", "cross");
        player2 = namePlayer(inputPlayer2.value || "Player 2", "circle");
        currentPlayer = player1;
    }

    function switchPlayers() {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }


    function getCurrentPlayer() {
        return currentPlayer;
    }

    playBtn.addEventListener("click", () => {
        hideSelector();
        setPlayers();
        Board.showBoard();
        Game.init();
    });

    return {
        showSelector,
        resetInputs,
        getCurrentPlayer,
        switchPlayers,
    }
})();

const Board = (function() {
    const boardContainer = document.querySelector(".board-container");

    function showBoard() {
        boardContainer.classList.remove("hidden");
    }

   function hideBoard() {
    boardContainer.classList.add("hidden");
   }

   function resetBoard(cells) {
    for(let i = 0; i < cells.length; i++) {
        cells[i].classList.remove("circle");
        cells[i].classList.remove("cross");
    }
   }

    return {
        showBoard,
        hideBoard,
        resetBoard,
    }
})();

const Game = (function() {
    const cells = document.querySelectorAll("[data-cell]");
    const messageContainer = document.querySelector(".message-container");
    const message = document.querySelector(".message");
    const restartBtn = document.querySelector("#restart");
    const exitBtn = document.querySelector("#exit");

    function init() {
        cells.forEach((cell) => cell.addEventListener("click", handleClick, {once:true}));
    }

    function handleClick(event) {
        const cell = event.target;
        Players.getCurrentPlayer();
        cell.classList.add(Players.getCurrentPlayer().marker);
        checkWin(cells);
        checkDraw(cells);
        Players.switchPlayers();
    }

    function checkWin(cells) {
        const winCombo = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for(let i = 0; i < winCombo.length; i++) {
            const [a, b, c] = winCombo[i];
            if  (cells[a].classList.contains(Players.getCurrentPlayer().marker) &&
                 cells[b].classList.contains(Players.getCurrentPlayer().marker) &&
                 cells[c].classList.contains(Players.getCurrentPlayer().marker)) {
                    showMessage(`${Players.getCurrentPlayer().name.toUpperCase()} WINS!`);
                 }
        }
    }

    function checkDraw(cells) {
        for(let i = 0; i < cells.length; i++) {
            if(!cells[i].classList.contains("circle") && !cells[i].classList.contains("cross")) {
                return;
            }
        }
        showMessage("IT'S A DRAW!");
    }

    function showMessage(messageText) {
        Board.hideBoard();
        messageContainer.classList.remove("hidden");
        message.textContent = messageText;
    }

    function hideMessage() {
        messageContainer.classList.add("hidden");
    }

    function restartGame() {
        hideMessage();
        Board.showBoard();
        Board.resetBoard(cells);
        init();
    }

    function exitGame() {
        hideMessage();
        Players.showSelector();
        Players.resetInputs();
        Board.resetBoard(cells);
    }

    restartBtn.addEventListener("click", restartGame);
    exitBtn.addEventListener("click", exitGame);

    return {
        init,
    }

})();


