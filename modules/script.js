var socket = io();

socket.on("send matrix", function (data) {
    console.log(data);
});



// var matrix = [
//     // [0, 0, 1, 0, 0],
//     // [1, 0, 0, 4, 0],
//     // [0, 1, 0, 0, 0],
//     // [1, 0, 1, 2, 0],
//     // [1, 4, 0, 0, 4],
//     // [3, 1, 0, 0, 0],
//     // [1, 1, 0, 0, 3]
// ];

// var grassArr = [];
// var grassEater = [];
// var predatorArr = [];

// //my characters
// var killerArr = [];
// var grassHelper = [];

// var side = 70;

// function setup() {


//     for (let i = 0; i < 10; i++) {
//         matrix[i] = []
//         for (let l = 0; l < 10; l++) {
//             let rand = round(random(5))
//             matrix[i].push(rand)
//         }

//     }
//     console.log(matrix);

//     frameRate(5)
//     createCanvas(matrix[0].length * side, matrix.length * side);
//     background('#acacac');

//     for (var y = 0; y < matrix.length; ++y) {
//         for (var x = 0; x < matrix[y].length; ++x) {
//             if (matrix[y][x] == 1) {
//                 var gr = new Grass(x, y, 1);
//                 grassArr.push(gr);
//             }
//             if (matrix[y][x] == 2) {
//                 var great = new GrassEater(x, y, 1);
//                 grassEater.push(great);
//             }
//             if (matrix[y][x] == 3) {
//                 var pred = new Predator(x, y, 1);
//                 predatorArr.push(pred);
//             }
//             if (matrix[y][x] == 4) {
//                 var grsmake = new PredKiller(x, y, 1);
//                 killerArr.push(grsmake);
//             }
//             if (matrix[y][x] == 5) {
//                 var grshelp = new GrassHelper(x, y, 1);
//                 grassHelper.push(grshelp);
//             }
//         } console.log();
//     }
// }

// function draw() {

//     for (var y = 0; y < matrix.length; y++) {
//         for (var x = 0; x < matrix[y].length; x++) {
//             if (matrix[y][x] == 1) {
//                 fill("green");
//                 rect(x * side, y * side, side, side);
//             }
//             else if (matrix[y][x] == 0) {
//                 fill("#acacac");
//                 rect(x * side, y * side, side, side);
//             }
//             else if (matrix[y][x] == 2) {
//                 fill("yellow");
//                 rect(x * side, y * side, side, side);
//             }
//             else if (matrix[y][x] == 3) {
//                 fill("red");
//                 rect(x * side, y * side, side, side);
//             }
//             else if (matrix[y][x] == 4) {
//                 fill("pink");
//                 rect(x * side, y * side, side, side);
//             }
//             else if (matrix[y][x] == 5) {
//                 fill("orange");
//                 rect(x * side, y * side, side, side);
//             }
//         }
//     }

//     for (var i in grassArr) {
//         grassArr[i].mul()
//     }

//     for (var i in grassEater) {
//         grassEater[i].eat()
//     }
//     for (var i in grassEater) {
//         grassEater[i].mul()
//     }

//     for(var i in predatorArr){
//         predatorArr[i].eat()
//     }
//     for(var i in predatorArr){
//         predatorArr[i].mul()
//     }

//     for(var i in killerArr){
//         killerArr[i].eat()
//     }

//     for(var i in grassHelper){
//         grassHelper[i].eat()
//     }
// }

