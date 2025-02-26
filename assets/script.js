const Players = (function() {
    const cacheDom = {
        playerSelector: document.querySelector(".player-selector"),
        playBtn: document.querySelector("#play-btn"),
        inputPlayer1: document.querySelector("#player1"),
        inputPlayer2: document.querySelector("#player2"),
    };

    let player1, player2, currentPlayer;

    function bindEvents() {
        cacheDom.playBtn.addEventListener("click", startGame);
    }

    function showSelector() {
        cacheDom.playerSelector.classList.remove("hidden");
    }

    function hideSelector() {
        cacheDom.playerSelector.classList.add("hidden");
    }

    function namePlayer(name, marker) {
        return {
            name,
            marker,
        }
    }

    function resetInputs() {
        cacheDom.inputPlayer1.value = "";
        cacheDom.inputPlayer2.value = "";
    }

    function setPlayers() {
        player1 = namePlayer(cacheDom.inputPlayer1.value || "Player 1", "cross");
        player2 = namePlayer(cacheDom.inputPlayer2.value || "Player 2", "circle");
        currentPlayer = player1;
    }

    function switchPlayers() {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }


    function getCurrentPlayer() {
        return currentPlayer;
    }

    function startGame() {
        hideSelector();
        setPlayers();
        Board.showBoard();
        Game.init();
    };

    bindEvents();

    return {
        showSelector,
        resetInputs,
        getCurrentPlayer,
        switchPlayers,
    }
})();

const Board = (function() {
    const cacheDom = {
        boardContainer: document.querySelector(".board-container"),
    }

    function showBoard() {
        cacheDom.boardContainer.classList.remove("hidden");
    }

   function hideBoard() {
        cacheDom.boardContainer.classList.add("hidden");
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
    const cacheDom = {
        cells: document.querySelectorAll("[data-cell]"),
        messageContainer: document.querySelector(".message-container"),
        message: document.querySelector(".message"),
        restartBtn: document.querySelector("#restart"),
        exitBtn: document.querySelector("#exit"),
    }

    function bindEvents() {
        cacheDom.cells.forEach(cell => cell.addEventListener("click", handleClick, { once: true }));
        cacheDom.restartBtn.addEventListener("click", restartGame);
        cacheDom.exitBtn.addEventListener("click", exitGame);
    }

    function unbindEvents() {
        cacheDom.cells.forEach((cell) => cell.removeEventListener("click", handleClick));
    }

    function init() {
        bindEvents();
    }

    function handleClick(event) {
        const cell = event.target;
        Players.getCurrentPlayer();
        cell.classList.add(Players.getCurrentPlayer().marker);
        checkWin(cacheDom.cells);
        checkDraw(cacheDom.cells);
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
        cacheDom.messageContainer.classList.remove("hidden");
        cacheDom.message.textContent = messageText;
    }

    function hideMessage() {
        cacheDom.messageContainer.classList.add("hidden");
    }

    function restartGame() {
        hideMessage();
        Board.showBoard();
        Board.resetBoard(cacheDom.cells);
        unbindEvents();
        init();
    }

    function exitGame() {
        hideMessage();
        Players.showSelector();
        Players.resetInputs();
        Board.resetBoard(cacheDom.cells);
        unbindEvents();
    }

    return {
        init,
    }

})();


