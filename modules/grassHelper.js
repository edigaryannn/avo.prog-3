//`grassHelper` object@ snvume bolor objectnerov baci `grass` ic
//erb `energy` in havasarvume 0 i ayn veracvum e `grassi`
let LivingCreature = require('./living')

module.exports = class GrassHelper extends LivingCreature{
    constructor(x,y){
        super(x,y)
        this.energy = 10;
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
                matrix[newY][newX] = 5
                this.y = newY
                this.x = newX
            }
        }
        else {
            this.remake();
        }
    }

    eat(){
        this.getNewCoordinates();
        let eaterCells = this.chooseCell(2 && 3 && 4)
        var newCell = this.random(eaterCells);

        if (newCell) {
            this.energy--;
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 5;
            this.y = newY
            this.x = newX
            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
            for (var i in grassEater) {
                if (newX == grassEater[i].x && newY == grassEater[i].y) {
                    grassEater.splice(i, 1);
                    break;
                }
            }
            for (var i in killerArr) {
                if (this.x == killerArr[i].x && this.y == killerArr[i].y)
                    killerArr.splice(i, 1);
                    break;
            }
            
        }
        else{
            this.move();
        }
    }


    remake() {
        var newGrass = new Grass(this.x, this.y, this.index);
        grassArr.push(newGrass);
        matrix[this.y][this.x] = 1;
        

        for (var i in grassHelper) {
            if (this.x == grassHelper[i].x && this.y == grassHelper[i].y)
                grassHelper.splice(i, 1);
                break;
        }
    }
}