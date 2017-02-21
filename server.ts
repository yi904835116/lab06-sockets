import net = require('net');//import socket module

interface Address { port: number; family: string; address: string; };

class MyServer {
    private server;

    constructor(){
        this.server = net.createServer(this.connectionListener); //create socket server
        this.server.on('listening', () =>{
            //get address info
            var addr: Address = this.server.address();
            //print the info
            console.log('server listening on port %d', addr.port);
        });
    }

    listen(){
        this.server.listen(3000);
    }


    connectionListener(socket: net.Socket){
        //we've established a socket to use
        console.log('connected');
        //send a message to the socket
        socket.write('connected on: ' + socket.remoteAddress +':'+ socket.remotePort +'\n');
        
        socket.on('data', this.dataListener);
        // handle if the client closes the connection
        socket.on('close', this.closeListener);
    }

    dataListener(data){

    }

    closeListener(){
        console.log('client disconnected');
        console.log('closing server');
        this.server.close();
    }

}

var server:MyServer = new MyServer();
server.listen();


