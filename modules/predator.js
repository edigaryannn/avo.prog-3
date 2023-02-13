class Predator extends LivingCreature{
    constructor(x,y,index){
    super(x,y,index)
    this.energy = 8;
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

    chooseCell(ch) {
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
            let emptyCells = this.chooseCell(0)
            var newCell = random(emptyCells);
            if (newCell) {
                var newX = newCell[0]
                var newY = newCell[1]
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = 3
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
                var newPredator = new Predator(newCell[0], newCell[1], this.index);
                predatorArr.push(newPredator);
                matrix[newCell[1]][newCell[0]] = 3;
                this.energy = 5;
            }
        }
    }

    eat(){
        this.getNewCoordinates();
        let eaterCells = this.chooseCell(2)
        var newCell = random(eaterCells);

        if (newCell) {
            this.energy++;
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 3
            this.y = newY
            this.x = newX
            for (var i in grassEater) {
                if (newX == grassEater[i].x && newY == grassEater[i].y) {
                    grassEater.splice(i, 1);
                    break;
                }
            }
        }
        else{
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y)
                predatorArr.splice(i, 1);
                break;
        }
    }
}