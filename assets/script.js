const Players = (function() {
    const playerSelector = document.querySelector(".player-selector");
    const playBtn = document.querySelector("#play-btn");
    const inputPlayer1 = document.querySelector("#player1");
    const inputPlayer2 = document.querySelector("#player2");

    let player1, player2, currentPlayer

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
    const cells = document.querySelectorAll("[data-cell]");
    cells.forEach((cell) => cell.addEventListener("click", addMarker, {once:true}));


    function showBoard() {
        boardContainer.classList.remove("hidden");
    }

    function addMarker(event) {
        let cell = event.target;
        Players.getCurrentPlayer();
        cell.classList.add(Players.getCurrentPlayer().marker);
        Players.switchPlayers();
    }

    return {
        showBoard,
    }
})();

const Game = (function() {


})();


