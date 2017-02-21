'use strict';
var net = require('net'), readline = require('readline'), client = new net.Socket(), io = readline.createInterface(process.stdin, process.stdout);
client.on('data', function (data) {
});
client.on('close', function () {
});
var HOST = '127.0.0.1';
var PORT = 3000;
client.connect(PORT, HOST, function () {
});
