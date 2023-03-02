let LivingCreature = require('./living')
module.exports = class Grass extends LivingCreature{

    chooseCell(ch) {
        return super.chooseCell(ch);
    }
    random(){
        let found = this.chooseCell(0);
        let result = Math.round(Math.random()*found.length)
        return found[result];
    }

    mul() {
        this.multiply++;
        var newCell = this.random(0);
        if(matrix[this.y][this.x] == 1){
            if (this.multiply >= 5 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
            }
        }
        else{
            for (var i in grassArr) {
                if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}

