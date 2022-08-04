// Gameboard use cases:
// - New game
// - Get board
// - Render board
// - Add a move
// - Announce winnder or draw?
const Game = (() => {

    let gameboard = {
        gameboard: [],
        gameOver: false,
        init: function() {
            this.cacheDom();
            this.bindEvents();
        },
        cacheDom: function(){
            this.htmlBoard = document.querySelector('.gameboard');
            this.htmlSquares = document.querySelectorAll('.game-square');
            this.htmlMessage = document.querySelector('.game-message');
            this.htmlgameSelect = document.querySelector('.game-select');
            this.htmlNewGame = document.querySelector('.btn-new-game');
            this.htmlRestart = document.querySelector('.btn-restart');
            this.htmlInputP1 = document.querySelector('#player1');
            this.htmlInputP2 = document.querySelector('#player2');
            this.htmlInputAI = document.querySelector('#playerAI');
        },
        newGame: function() {
            // Display gameboard and hide new game btn
            this.htmlBoard.classList.remove('display-none');
            this.htmlgameSelect.classList.add('display-none');
            // Reset board
            for (let i = 0; i < this.htmlSquares.length; i++) {
                this.htmlSquares[i].classList.remove('mark-x', 'mark-o');
            }
            // Reset counter
            this.moveCounter.counter = 0;
            // Reset the array
            this.gameboard = [[null, null, null],
                              [null, null, null],
                              [null, null, null]];
            this.gameOver = false
            this.render();
        },
        bindEvents: function() {
            this.htmlSquares.forEach(square => {
                square.addEventListener('click', () => {
                    let [row, column] = square.getAttribute('data-position').split("");
                    this.addMove(row, column);
                });
            });

            this.htmlNewGame.addEventListener('click', () => {
                this.createPlayers();
                this.newGame();
            });

            this.htmlRestart.addEventListener('click', () => {
                this.htmlInputP1.value = '';
                this.htmlInputP2.value = '';
                this.htmlInputAI.checked = false;
                this.htmlgameSelect.classList.remove('display-none');
                this.htmlBoard.classList.add('display-none');
                this.htmlMessage.textContent = '';
            });

        },
        render: function() {
            for (let i = 0; i < this.gameboard.length; i++) {
                for (let j = 0; j < this.gameboard[i].length; j++) {
                    // c is used to help count array 1 and 2 because 
                    // of the two dimensional array.
                    // Exempel: Square number 4, is c = 3 + i = 1
                    let c = i === 0 ? 0 : i === 1 ? 3 : 6;

                    if(this.gameboard[i][j] === 'X') {
                        this.htmlSquares[c + j].classList.add('mark-x');
                    }

                    if(this.gameboard[i][j] === 'O') {
                        this.htmlSquares[c + j].classList.add('mark-o');
                    }
                }
            }
            if (this.gameOver) {
                let winner = (this.moveCounter.counter % 2 === 0) ? this.players.p2.name : this.players.p1.name
                this.htmlMessage.textContent = `${winner} wins!`;
            }
            if (this.moveCounter.counter === 9) {
                this.htmlMessage.textContent = 'Draw!';
            }
        },
        moveCounter: {
            counter: 0,
            addCount: function() {
                this.counter++;
            },
        },
        addMove: function(row, column) {
            if (!this.gameOver){
                if (this.gameboard[row][column] === null) {
                    let mark = (this.moveCounter.counter % 2 === 0) ? 'X' : 'O'
                    this.gameboard[row][column] = mark;

                    this.checkWinner(mark);
                    this.moveCounter.addCount();
                    this.render();
                }
            }
        },
        checkWinner: function(mark) {
            // Make array one dimensional to check winning pattern.
            const flatBoard = this.gameboard.map(x => x.map(a => a === mark)).flat();
            // Horizontal check
            if (flatBoard[0] && flatBoard[1] && flatBoard[2]) this.gameOver = true;
            if (flatBoard[3] && flatBoard[4] && flatBoard[5]) this.gameOver = true;
            if (flatBoard[6] && flatBoard[7] && flatBoard[8]) this.gameOver = true;
            // Vertical check
            if (flatBoard[0] && flatBoard[3] && flatBoard[6]) this.gameOver = true;
            if (flatBoard[1] && flatBoard[4] && flatBoard[7]) this.gameOver = true;
            if (flatBoard[2] && flatBoard[5] && flatBoard[8]) this.gameOver = true;
            // Diagonal check
            if (flatBoard[0] && flatBoard[4] && flatBoard[8]) this.gameOver = true;
            if (flatBoard[2] && flatBoard[4] && flatBoard[6]) this.gameOver = true;
        },
        players: {},
        createPlayers: function() {
            this.players.p1 = {name: this.htmlInputP1.value || 'player 1', type: 'player'};
            this.players.p2 = {name: this.htmlInputP2.value || 'player 2', type: 'player'};
            if (this.htmlInputAI.checked) {
                this.players.p2.name = `${this.players.p2.name} (computer)`;
                this.players.p2.type = 'computer';
            }
        }
    }

    gameboard.init();

})();


// Player use cases:
// - Create player
// - Player type: Player or AI
// - Player sign (X or O)
const Player = (name, mark, type) => {
    return {name, mark, type};
}