//Predtor Killer
//snvum e predator nerov, kyanqi tevoxutyun@ shat karch e
let LivingCreature = require('./living')


module.exports = class PredKiller extends LivingCreature{
    constructor(x,y){
        super(x,y)
        this.energy = 2;
        this.directions = [];
    }

    random(ch){
        let found = this.chooseCell(ch);
        let result = Math.floor(Math.random()*found.length)
        return found[result];
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
            var newCell = this.random(0);
            if (newCell) {
                var newX = newCell[0]
                var newY = newCell[1]
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = 4
                this.y = newY
                this.x = newX
            }
        }
        else {
            this.die();
        }
    }
   

    eat(){
        this.getNewCoordinates();
        var newCell = this.random(3);

        if (newCell) {
            this.energy = 3;
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;
            this.y = newY
            this.x = newX
            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
        }
        else{
            this.move();
        }
    }


    die() {
        matrix[this.y][this.x] = 0;
        for (var i in killerArr) {
            if (this.x == killerArr[i].x && this.y == killerArr[i].y)
                killerArr.splice(i, 1);
                break;
        }
    }
}