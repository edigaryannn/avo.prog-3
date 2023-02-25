let LivingCreature = require('./living')

module.exports = class GrassEater extends LivingCreature{
    constructor(x, y, index) {
        super(x,y,index)
        this.energy = 8;
    }

    chooseCell(ch) {
        this.getNewCoordinates()
        return super.chooseCell(ch);
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    move() {
        if (this.energy > 0) {
            this.energy--
            this.getNewCoordinates();
            let emptyCells = this.chooseCell(0)
            var newCell = random(emptyCells);
            if (newCell) {
                var newX = newCell[0]
                var newY = newCell[1]
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = 2
                this.y = newY
                this.x = newX
            }
        }
        else {
            this.die();
        }
    }

    mul() {
        if (this.energy >= 12) {
            var newCell = random(this.chooseCell(0));
            if (newCell) {
                var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
                grassEater.push(newGrassEater);
                matrix[newCell[1]][newCell[0]] = 2;
                this.energy = 5;
            }
        }
    }

    eat() {
        this.getNewCoordinates();
        let grassCells = this.chooseCell(1)
        var newCell = random(grassCells);

        if (newCell && this.chooseCell(1)) {
            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 2
            this.y = newY
            this.x = newX
            this.energy++
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

        }
        else {
            this.move()
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEater) {
            if (this.x == grassEater[i].x && this.y == grassEater[i].y)
                grassEater.splice(i, 1);
            break;

        }
    }
}