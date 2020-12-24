class Player
{
    constructor(tetris)
    {   
        this.DROP_SLOW = 1000;
        this.DROP_FAST = 50;

        this.tetris = tetris;
        this.arena = tetris.arena;

        this.dropCounter = 0;
        this.dropInterval = this.DROP_SLOW;
        this.pos = {x:0, y:0};
        this.matrix = null;
        this.score = 0;

        this.reset();
    }

    move(dir) 
    {
        this.pos.x += dir;
        // if collide, we move back
        if(this.arena.collide(this)) {
            this.pos.x -= dir;
        }
    }

    reset() 
    {
        const pieces = 'TJLOSZI';
        // create a piece randomly
        this.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
        this.pos.y = 0;
        // put the piece in the middle of x axis
        this.pos.x = (this.arena.matrix[0].length / 2 | 0) -
                       (this.matrix[0].length / 2 | 0);
    
        // if the top row is filled up
        if (this.arena.collide(this)) {
            this.arena.clear();
            this.score = 0;
            this.tetris.updateScore(this.score);
        }
    }

    rotate(dir) 
    {
        const pos = this.pos.x;
        let offset = 1;
        this._rotateMatrix(this.matrix, dir);
        while (this.arena.collide(this)) {
            this.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            // bail in case it didn't work
            if (offset > this.matrix[0].length) {
                rotate(this.matrix, -dir);
                this.pos.x = pos;
                return;
            }
        }
    }

    _rotateMatrix(matrix, dir) {
        for (let y = 0; y < matrix.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [
                    matrix[x][y],
                    matrix[y][x],
                ] = [
                    matrix[y][x],
                    matrix[x][y],
                ];
            }
        }
    
        if (dir > 0) {
            matrix.forEach(row => row.reverse());
        } else {
            matrix.reverse();
        }
    }

    drop() 
    {
        this.pos.y++;
        // if we collide
        if (this.arena.collide(this)) {
            this.pos.y--;
            // merge with the arena
            this.arena.merge(this);
            this.reset();
            // sweep returns the new gained score
            this.score += this.arena.sweep();
            // call updateScore to update score
            this.tetris.updateScore(this.score);
        }
        // doesn't want another drop to happen
        this.dropCounter = 0;
    }

    update(deltaTime)
    {
        this.dropCounter += deltaTime;
        if (this.dropCounter > this.dropInterval) {
            this.drop();
        }
    }
}