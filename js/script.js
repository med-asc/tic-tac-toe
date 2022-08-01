// Gameboard use cases:
// - New game
// - Get board
// - Add a move
// - Announce winnder or draw?
const Gameboard = (() => {
    let gameboard =  [[null, null, null],
                      [null, null, null],
                      [null, null, null]];

    const newGame = () => {
        gameboard = [[null, null, null],
                     [null, null, null],
                     [null, null, null]];
    };

    const getBoard = () => console.table(gameboard);

    let moveCounter = {
        counter: 0,
        addCount: () => {
            moveCounter.counter++;
        },
    }

    const addMove = (row, column) => {
        if (moveCounter.counter % 2 === 0) {
            console.log(`p2 turn!`)
            gameboard[row][column] = 'X'
        } else {
            console.log(`p1 turn!`)
            gameboard[row][column] = 'O';
        }
        moveCounter.addCount()
    };

    return {
        newGame,
        getBoard,
        addMove,
    };
})();


// Player use cases:
// - Create player
// - Player type: Player or AI
// - Player sign (X or O)
const Player = (name, mark, type) => {
    return {name, mark, type};
}

const p1 = Player('Player 1', 'X' ,'player');
const p2 = Player('Player 2', 'O', 'ai');
Gameboard.addMove(1, 1);
Gameboard.addMove(0, 2);
Gameboard.addMove(0, 1);

Gameboard.getBoard();