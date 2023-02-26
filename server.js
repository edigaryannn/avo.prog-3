var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("modules"));
app.get('/', function (req, res) {
    res.redirect('index.html')
});
server.listen(3000, function () {
    console.log("Example is running on port 3000");
});;


matrix = [];
grassArr = [];
grassEater = [];
predatorArr = [];
killerArr = [];
grassHelper = [];
//my characters   
Grass = require('./modules/grass')
GrassEater = require('./modules/grassEater')
GrassHelper = require('./modules/grassHelper')
PredKiller = require('./modules/killer')
Predator = require('./modules/Predator')

function matrixGen() {
    for (let i = 0; i < 10; i++) {
        matrix[i] = []
        for (let l = 0; l < 10; l++) {
            let rand = Math.floor((Math.random() * 6))
            matrix[i].push(rand)
        }
    }
}

// matrix = matrixGen();
matrixGen()

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
        } console.log();
    }
    io.sockets.emit("send matrix", matrix)
}

console.log(grassArr);

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
}

setInterval(game, 200)

io.on('connection', function (socket) {
    createObjects();
    // socket.emit("send matrix", matrix)
    socket.emit("send grassArr", grassArr)
    socket.emit("send grassEater", grassEater)
    socket.emit("send predatorArr", predatorArr)
    socket.emit("send killerArr", killerArr)
    socket.emit("send grassHelper", grassHelper)
});



