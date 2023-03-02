const Grass = require('./modules/grass')
const GrassEater = require('./modules/grassEater')
const GrassHelper = require('./modules/grassHelper')
const PredKiller = require('./modules/killer')
const Predator = require('./modules/Predator')

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');

app.use(express.static("modules"));
app.get('/', function (req, res) {
    res.redirect('index.html')
});
server.listen(3000, function () {
    console.log("Example is running on port 3000");
});



//my characters 
matrix = [];
grassArr = [];
grassEater = [];
predatorArr = [];
killerArr = [];
grassHelper = [];
//

var matLen = 50

function matrixGen(matLen) {
    for (let i = 0; i < matLen; i++) {
        matrix[i] = []
        for (let l = 0; l < matLen; l++) {
            // let rand = Math.round((Math.random() * 5))
            matrix[i].push(0)
        }
    }
    return matrix
}

matrix = matrixGen(matLen);
matrixGen()

function addGrass() {
    for (let j = 0; j < 1; j++) {
        let x = Math.round(Math.random() * matLen);
        let y = Math.round(Math.random() * matLen);
        if (matrix[y][x] === 0) {
            matrix[y][x] = 1;
            grassArr.push(new Grass(x, y))
        }
    }
}
function addGrassEater() {
    for (let j = 0; j < 1; j++) {
        let x = Math.round(Math.random() * matLen);
        let y = Math.round(Math.random() * matLen);
        if (matrix[y][x] === 0) {
            matrix[y][x] = 2;
            grassEater.push(new GrassEater(x, y))
        }
    }
}

function addOthers() {
    for (let j = 0; j < 1; j++) {
        let x = Math.round(Math.random() * matLen);
        let y = Math.round(Math.random() * matLen);
        let randobj = Math.round(Math.random() * 2);
        if (matrix[y][x] === 0) {
            if (randobj == 0) {
                matrix[y][x] = 3;
                predatorArr.push(new Predator(x, y));
            }
            else if (randobj == 1) {
                matrix[y][x] = 4;
                killerArr.push(new PredKiller(x, y));
            }
            else if (randobj == 2) {
                matrix[y][x] = 5;
                grassHelper.push(new GrassHelper(x, y));
            }
        }
    }
}

function clearf() {
    summerArgument = true;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = 0;
            grassArr.length = 0;
            grassEater.length = 0;
            predatorArr.length = 0;
            killerArr.length = 0;
            grassHelper.length = 0;
        }
    }

}

function createObjects() {

    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            if (matrix[y][x] == 2) {
                var great = new GrassEater(x, y, 1);
                grassEater.push(great);
            }
            if (matrix[y][x] == 3) {
                var pred = new Predator(x, y, 1);
                predatorArr.push(pred);
            }
            if (matrix[y][x] == 4) {
                var grsmake = new PredKiller(x, y, 1);
                killerArr.push(grsmake);
            }
            if (matrix[y][x] == 5) {
                var grshelp = new GrassHelper(x, y, 1);
                grassHelper.push(grshelp);
            }
        }
    }
    // io.sockets.emit("send matrix", matrix)
}


function game() {
        for (var i in grassArr) {
            grassArr[i].mul()
        }

        for (var i in grassEater) {
            grassEater[i].eat();

        }
        for (var i in grassEater) {
            grassEater[i].mul()
        }

        for (var i in predatorArr) {
            predatorArr[i].eat();

        }
        for (var i in predatorArr) {
            predatorArr[i].mul()
        }
        for (var i in killerArr) {
            killerArr[i].eat()
        }

        for (var i in grassHelper) {
            grassHelper[i].eat()
        }

    let Statistic = {
        grass: grassArr.length,
        grassEater: grassEater.length,
        predator: predatorArr.length,
        killer: killerArr.length,
        grasshelper: grassHelper.length,
    };
    let data = JSON.stringify(Statistic, null, 2)
    fs.writeFileSync('statistics.json', data)
    io.sockets.emit("send", data);

    // ________________

    io.sockets.emit("send matrix", matrix);
}
    

setInterval(game, 200)


io.on('connection', function (socket) {
    createObjects();
    socket.on('addgrass', addGrass);
    socket.on('addgrasseater', addGrassEater);
    socket.on('addothers', addOthers);
    socket.on('clearf', clearf);
});

