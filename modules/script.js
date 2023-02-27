var socket = io();

socket.on("send matrix", function (data) {
    // console.log(data);
   drawing(data)
});
// socket.on("send grassArr", function (data) {
//     // console.log(data);
// });
// socket.on("send grassEater", function (data) {
//     // console.log(data);
// });
// socket.on("send predatorArr", function (data) {
//     // console.log(data);
// });
// socket.on("send killerArr", function (data) {
//     // console.log(data);
// });
// socket.on("send grassHelper", function (data) {
//     // console.log(data);
// });

var side = 10;



function setup() {

    frameRate(5)
    createCanvas(70 * side, 70 * side);
    background('#acacac');

}


summerArgument = false
let summer = document.getElementById('summer');
summer.addEventListener('click', function () {
    rainArgument = false;
    springArgument = false;
    summerArgument = true;
    autumnArgument = false;
    winterArgument = false;
});


winterArgument = false
let winter = document.getElementById('winter');
winter.addEventListener('click', function () {
    rainArgument = false;
    springArgument = false;
    summerArgument = false;
    autumnArgument = false;
    winterArgument = true;
});




function drawing(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                //grass
                if (winterArgument == true){
                    fill("white")
                }
                else if (summerArgument == true){
                    fill("green");
                }
                
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                //datark
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                //grassEater
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                //predator
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                //predator killer
                fill("pink");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                //grass helper
                fill("orange");
                rect(x * side, y * side, side, side);
            }
        }
    }
}

