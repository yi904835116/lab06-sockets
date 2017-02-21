"use strict";
var net = require("net"); //import socket module
var MyServer = (function () {
    function MyServer() {
        this.server = net.createServer(this.connectionListener); //create socket server
        this.server.on('listening', function () {
            console.log('hey!');
        });
    }
    MyServer.prototype.listen = function () {
        this.server.listen(3000);
    };
    MyServer.prototype.connectionListener = function (socket) {
        //we've established a socket to use
        console.log('connected');
        //send a message to the socket
        socket.write('connected on: ' + socket.remoteAddress + ':' + socket.remotePort + '\n');
        socket.on('data', this.dataListener);
        // handle if the client closes the connection
        socket.on('close', this.closeListener);
    };
    MyServer.prototype.dataListener = function (data) {
    };
    MyServer.prototype.closeListener = function () {
        console.log('client disconnected');
        console.log('closing server');
        this.server.close();
    };
    return MyServer;
}());
var server = new MyServer();
server.listen();
