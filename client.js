var net = require('net');
//make the client
var client = new net.Socket();
client.on('data', function (data) {
    console.log("Received: " + data); //output it
});
client.on('close', function () {
    console.log('Connection closed');
});
var HOST = '127.0.0.1';
var PORT = 3000;
//connect to the server
client.connect(PORT, HOST, function () {
    console.log('Connected to: ' + HOST + ':' + PORT);
    //send message to server
    client.write("Hello server, I'm the client!");
});
