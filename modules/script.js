var socket = io();

socket.on("send matrix", function (data) {
    console.log(data);
   drawing(data)
});
socket.on("send grassArr", function (data) {
    console.log(data);
});
socket.on("send grassEater", function (data) {
    console.log(data);
});
socket.on("send predatorArr", function (data) {
    console.log(data);
});
socket.on("send killerArr", function (data) {
    console.log(data);
});
socket.on("send grassHelper", function (data) {
    console.log(data);
});

var side = 70;



function setup() {

    frameRate(5)
    createCanvas(10 * side, 10 * side);
    background('#acacac');

}
function drawing(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("pink");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("orange");
                rect(x * side, y * side, side, side);
            }
        }
    }
}