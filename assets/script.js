const Players = (function() {
    const playerSelector = document.querySelector(".player-selector");
    const playBtn = document.querySelector("#play-btn");
    const inputPlayer1 = document.querySelector("#player1");
    const inputPlayer2 = document.querySelector("#player2");

    function hideSelector() {
        playerSelector.classList.add("hidden");
    }

    function namePlayer(name, marker) {
        return {
            name,
            marker
        }
    }

    function getPlayers() {
        const player1 = namePlayer(inputPlayer1.value || "Player 1", "cross");
        const player2 = namePlayer(inputPlayer2.value || "Player 2", "circle");
        console.log(player1, player2);
        return player1, player2;

    }

    playBtn.addEventListener("click", hideSelector);
    playBtn.addEventListener("click", getPlayers);
})();


