const Players = (function() {
    const playerSelector = document.querySelector(".player-selector");
    const playBtn = document.querySelector("#play-btn");
    const inputPlayer1 = document.querySelector("#player1");
    const inputPlayer2 = document.querySelector("#player2");

    let player1, player2, currentPlayer;

    function hideSelector() {
        playerSelector.classList.add("hidden");
    }

    function namePlayer(name, marker) {
        return {
            name,
            marker,
        }
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
    });

    return {
        getCurrentPlayer,
        switchPlayers,
    }
})();

const Board = (function() {
    const boardContainer = document.querySelector(".board-container");

    function showBoard() {
        boardContainer.classList.remove("hidden");
    }

    return {
        showBoard,
    }
})();

const Game = (function() {
    const cells = document.querySelectorAll("[data-cell]");
    cells.forEach((cell) => cell.addEventListener("click", handleClick, {once:true}));

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
                    console.log(`${Players.getCurrentPlayer().name} wins`);
                 }
        }
    }

    function checkDraw(cells) {
        for(let i = 0; i < cells.length; i++) {
            if(!cells[i].classList.contains("circle") && !cells[i].classList.contains("cross")) {
                return;
            }
        }
        console.log("Draw");
    }


})();


