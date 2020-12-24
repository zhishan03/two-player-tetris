function createPiece(type) {
    // 'T' piece
    if (type === 'T') {
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ];
    } 
    // 'O' piece
    else if (type === 'O') {
        return [
            [2, 2],
            [2, 2],
        ];
    } 
    // 'L' piece
    else if (type === 'L') {
        return [
            [0, 3, 0], 
            [0, 3, 0],
            [0, 3, 3],
        ];
    }
    // 'J' piece
    else if (type === 'J') {
        return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0],
        ];
    }
    // 'I' piece
    else if (type === 'I') {
        return [
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
        ];
    }
    // 'S' piece
    else if (type === 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    }
    // 'Z' piece
    else if (type === 'Z') {
        return [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0],
        ];
    }
}


// to make tetris accessible in global scope
const tetri = [];
const playerElements = document.querySelectorAll('.player');
[...playerElements].forEach(element => {
    const canvas = document.querySelector('canvas');
    // create a tetris instance
    const tetris = new Tetris(element);
    tetri.push(tetris);
});

const keyListener = (event) => {
    [
        [65, 68, 81, 69, 83],
        [72, 75, 89, 73, 74],
    ].forEach((key, index) => {
        const player = tetri[index].player;
        if (event.type === 'keydown') {
        // keycode of the event
            if (event.keyCode === key[0]) {
                player.move(-1);
            } else if (event.keyCode === key[1]) {
                player.move(1);
            } else if (event.keyCode === key[2]) {
                player.rotate(-1);
            } else if (event.keyCode === key[3]) {
                player.rotate(1);
            }
        }

        if (event.keyCode === key[4]) {
            if (event.type === 'keydown') {
                if (player.dropInterval !== player.DROP_FAST) {
                    player.drop();
                    player.dropInterval = player.DROP_FAST;
                }
            } else {
                player.dropInterval = player.DROP_SLOW;
            } 
        }
    });
};

document.addEventListener('keydown', keyListener);
document.addEventListener('keyup', keyListener);

