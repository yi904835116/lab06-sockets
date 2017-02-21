"use strict";
var net = require("net");
;
var server = net.createServer();
server.on('connection', function (socket) {
    socket.on('data', function (data) {
    });
    socket.on('close', function () {
    });
});
server.on('listening', function () {
    var addr = server.address();
    console.log('server listening on port %d', addr.port);
});
server.listen(3000);
