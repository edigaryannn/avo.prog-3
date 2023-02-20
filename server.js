var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var messages = [];
app.use(express.static("modules"));
app.get('/', function (req, res) {
    res.redirect('index.html')
});
server.listen(3000, function () {
    console.log("Example is running on port 3000");
});;


matrix = [];
function setup() {
    for (let i = 0; i < 10; i++) {
        matrix[i] = []
        for (let l = 0; l < 10; l++) {
            let rand = Math.round(Math.random(5))
            matrix[i].push(rand)
        }
    }
}
setup();
    console.log(matrix);


    io.on('connection', function (socket) {
        socket.emit("send matrix", matrix)
        //     for (var i in messages) {
        //         socket.emit("display message", messages[i]);
        //     }
        //     socket.on("send message", function (data) {
        //         messages.push(data);
        //         io.sockets.emit("display message", data);
        //     });
    });