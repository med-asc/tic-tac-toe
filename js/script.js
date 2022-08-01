// Gameboard use cases:
// - New game
// - Get board
// - Render board
// - Add a move
// - Announce winnder or draw?
const Game = (() => {

    let gameboard = {
        gameboard: [],
        init: function() {
            this.newGame();
            this.cacheDom();
            this.render();
        },
        newGame: function() {
            this.gameboard = [[null, null, null],
                              [null, null, null],
                              [null, null, null]];
        },
        cacheDom: function(){
            this.htmlBoard = document.querySelector('.gameboard');
            this.htmlSquare = document.querySelectorAll('.game-square');
        },
        render: function() {
            for (let i = 0; i < this.gameboard.length; i++) {
                for (let j = 0; j < this.gameboard[i].length; j++) {
                    let c = i === 0 ? 0 : i === 1 ? 3 : 6;
                    this.htmlSquare[c + j].textContent = this.gameboard[i][j];
                }
            }   
        },
        moveCounter: {
            counter: 0,
            addCount: function() {
                this.counter++;
            },
        },
        addMove: function(row, column) {
            if (this.gameboard[row][column] === null) {
                let mark = (this.moveCounter.counter % 2 === 0) ? 'X' : 'O'
                this.gameboard[row][column] = mark;

                this.moveCounter.addCount();
                this.render();
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