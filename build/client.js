'use strict';
var ip = require("ip");
var net = require('net'), readline = require('readline'), client = new net.Socket(), io = readline.createInterface(process.stdin, process.stdout);
client.on('data', function (data) {
});
client.on('close', function () {
});
var HOST = ip.address();
var PORT = 3000;
client.connect(PORT, HOST, function () {
});
