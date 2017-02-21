"use strict";
var net = require("net"); //import socket module
;
var MyServer = (function () {
    function MyServer() {
        var _this = this;
        this.clients = [];
        //create socket server with connection listener 
        this.server = net.createServer(function (socket) { return _this.handleConnection(socket); });
        this.server.on('listening', function () {
            //get address info
            var addr = _this.server.address();
            //print the info
            console.log('server listening on port %d', addr.port);
        });
    }
    // starts the server
    MyServer.prototype.listen = function () {
        this.server.listen(3000);
    };
    // function that is called when listener
    MyServer.prototype.handleConnection = function (socket) {
        //we've established a socket to use
        // add it to the list of sockets
        this.clients.push(socket);
        //send a message to the socket
        socket.write('connected on: ' + socket.remoteAddress + ':' + socket.remotePort + '\n');
        //initialize buffer for incoming messages
        //because network servers receive incoming data in chunks, we
        //need to buffer up the data we receive until we see the end of
        //a complete 'message', which in our case is indicated by a newline
        //in the input (\n)
        var buffer = '';
        var name;
        //start by welcoming and asking for a name
        socket.write("Hi, what's your name?\n");
        // handle data events
        //socket.on('data', (data, buffer:String, socket: net.Socket) => this.handleData(data, buffer, socket));
        socket.on('data', this.handleData);
        //socket.on('message', (message:String, socket:net.Socket, name:String) => this.handleMessage(message, socket, name));
        // handle if the client closes the connection
        socket.on('close', this.handleClose);
    };
    MyServer.prototype.handleData = function (data) {
        console.log('got data');
    };
    // // listen on data
    // handleData(data, buffer:String, socket:net.Socket){
    //     console.log('got data');
    //     //append to the message string
    //     buffer += data;
    //     //is there a newline in the data?
    //     var idx = buffer.indexOf('\n');
    //     if (idx >= 0) {
    //         //extract message (omit newline)
    //         //but leave anything past the newline in the buffer
    //         var message = buffer.substring(0, idx - 1);
    //         buffer = buffer.substring(idx + 1);
    //         //truncate message to 140 chars ('cause we wish we were twitter)
    //         message = message.substr(0, 140);
    //         //emit a 'message' event on the socket
    //         //passing the full message as the data
    //         socket.emit('message', message);
    //     } //newline in buffer
    // }
    MyServer.prototype.handleMessage = function (message, socket, name) {
        if (0 === message.length) {
            socket.write('(type something and hit return)\n');
            return;
        }
        //if we haven't captured the name yet, treat this as the name
        if (!name) {
            //truncate name to 10 characters, just to be safe
            name = message.substr(0, 10);
            //respond with a friendly greeting
            socket.write('Hello ' + name + '!\n');
            socket.write('Welcome to the chat room, ' + name + '!\n');
            socket.write('There are ' + this.clients.length + ' people here.\n');
            socket.write("Type messages, or type 'exit' at any time to leave.\n");
        }
        else {
            //if message is exactly 'exit' then close the connection
            if ('exit' === message) {
                socket.end();
            }
            else {
                //broadcast the message to all other clients
                this.broadcast(name, message, socket);
            }
        }
    };
    MyServer.prototype.broadcast = function (name, message, socket) {
        this.clients.forEach(function (client) {
            //don't send to self
            if (client !== socket) {
                client.write('[' + name + '] ' + message + '\n');
            }
        });
    };
    // listen on close
    MyServer.prototype.handleClose = function (socket) {
        console.log(socket);
        console.log('client disconnected');
    };
    return MyServer;
}());
var server = new MyServer();
server.listen(); // start the server
// //create a new socket server
// let server = net.createServer();
// //array of all connected clients
// let clients: net.Socket[] = [];
// // when a server gets a new connection
// server.on('connection', (socket: net.Socket) => {
//     // add the socket to the list of clients
//     clients.push(socket);
//     console.log('new connection');
//     console.log('%d client(s)', clients.length);
//     // send a message to the socket
//     //buffer for incoming messages
//     //because network servers receive incoming data in chunks, we
//     //need to buffer up the data we receive until we see the end of
//     //a complete 'message', which in our case is indicated by a newline
//     //in the input (\n)
//     let buffer:String = '';
//     socket.on('data', (data) => {
//     });
//     socket.on('message', () => {
//     });
// });
// // when the server starts listening
// server.on('listening', () => {
//     //output to the console the port number on which we are listening
//     var addr:Address = server.address();
//     console.log('server listening on port %d', addr.port);
// });
// // start the server 
// server.listen(3000); 
