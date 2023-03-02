var socket = io();

socket.on("send matrix", function (data) {
   drawing(data)
});
var side = 10;
let drop = [];


function setup() {

    createCanvas(500, 500);
    background('#acacas');
    for (var i = 0; i < 200; i++) {
        drop[i] = new Drop();
    }

}


let addGrass = document.getElementById('addgrass');
addGrass.addEventListener('click', function () {
    socket.emit('addgrass');
})
let addGrassEater = document.getElementById('addgrasseater');
addGrassEater.addEventListener('click', function () {
    socket.emit('addgrasseater');
})
let addOthers = document.getElementById('addothers');
addOthers.addEventListener('click', function () {
    socket.emit('addothers');
})

let clearf = document.getElementById('clearf');
clearf.addEventListener('click', function () {
    socket.emit('clearf');
    snowArgument = false;
})


let springArgument = false;
let spring = document.getElementById('spring');
spring.addEventListener('click', function () {
    snowArgument = false;
    springArgument = true;
    summerArgument = false;
    autumnArgument = false;
    winterArgument = false;
})

summerArgument = true
let summer = document.getElementById('summer');
summer.addEventListener('click', function () {
    snowArgument = false;
    springArgument = false;
    summerArgument = true;
    autumnArgument = false;
    winterArgument = false;
});

let autumnArgument = false;
let autumn = document.getElementById('autumn');
autumn.addEventListener('click', function () {
    snowArgument = false;
    springArgument = false;
    summerArgument = false;
    autumnArgument = true;
    winterArgument = false;
});

winterArgument = false
let winter = document.getElementById('winter');
winter.addEventListener('click', function () {
    snowArgument = false;
    springArgument = false;
    summerArgument = false;
    autumnArgument = false;
    winterArgument = true;
});

let snowArgument = false;
let snow = document.getElementById('snow');
snow.addEventListener('click', function () {
    snowArgument = true;
    springArgument = false;
    summerArgument = false;
    autumnArgument = false;
    winterArgument = true;
})


function Drop() {
    this.x = random(0, width);
    this.y = random(0, -height);

    this.show = function () {
        noStroke();
        fill("lightblue");
        ellipse(this.x, this.y, random(1, 5), random(1, 5));
    }
    this.update = function () {
        this.speed = random(5, 10);
        this.gravity = 1.05;
        this.y = this.y + this.speed * this.gravity;

        if (this.y > height) {
            this.y = random(0, -height);
            this.gravity = 0;
        }
    }
}


function drawing(matrix) {
    noStroke();
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 0) {
                //datark
                fill("#acacac");
            }

            else if (matrix[y][x] == 1) {
                //grass
                if (springArgument === true) {
                    fill('pink')
                } else if (summerArgument === true) {
                    fill('green');
                } else if (autumnArgument === true) {
                    fill('#808000');
                } else if (winterArgument === true) {
                    fill('white');
                }
                
                
            }

            else if (matrix[y][x] == 2) {
                //grassEater
                fill("yellow");
            }

            else if (matrix[y][x] == 3) {
                //predator
                fill("red");
            }

            else if (matrix[y][x] == 4) {
                //predator killer
                fill("pink");
            }

            else if (matrix[y][x] == 5) {
                //grass helper
                fill("orange");
            }
            rect(x * side, y * side, side, side);
        }
    }
    if (snowArgument === true) {
        for (var i = 0; i < 200; i++) {
            drop[i].show();
            drop[i].update();                
        }
    }
}


socket.on("send", function (Statistic) {
    let p5 = document.getElementById("p5");
    let p1 = document.getElementById("p1");
    let p2 = document.getElementById("p2");
    let data = JSON.parse(Statistic);
    p5.innerHTML = data.grass;
    p1.innerHTML = data.grassEater;
    p2.innerHTML = data.predator;

}); 
