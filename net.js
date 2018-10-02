const server = require('net').createServer();
const chalk = require('chalk');
let counter = 0;
let sockets = {};
let completeData = '';
function timestamp() {
    const now = new Date();
    return now.getHours() + " : " + now.getMinutes();
}
server.on('connection', socket => {
    socket.id = counter++;
    console.log(`Connection established ${socket.remoteAddress}:${socket.remotePort}`);
    socket.write("Enter your nickname:\r\n");


    socket.on('data', data => {
        completeData += data.toString();
        if (completeData[completeData.length - 1] == '\n' && completeData.length>2) {
            if (!sockets[socket.id]) {
                socket.name = completeData.trim();
                socket.write('\u001B[2J\u001B[0;0f');
                
                socket.write(chalk.yellow(`Welcome ${socket.name} | Total Participants ${sockets.length===undefined?0:sockets.length}`));
                socket.write(chalk.white('\r\n'));
                sockets[socket.id] = socket;
                Object.entries(sockets).forEach(([key, cs]) => {
                    if (socket.id == key) { }
                    else{
                        cs.write(chalk.blue(`${socket.name} joined! Total Participants ${sockets.length===undefined?0:sockets.length}`));
                        cs.write(chalk.white('\r\n'));
                    }
                })
            }
            else {
                Object.entries(sockets).forEach(([key, cs]) => {
                    if (socket.id == key) { }
                    else{
                        cs.write(chalk.green(`${socket.name} : ${completeData.trim()} | ${timestamp()}\r\n`));
                        cs.write(chalk.white('\r\n'));
                    }
                        
                })
            }
            completeData = ''
        }
    })

    socket.on('end', () => {
        delete sockets[socket.id];
        console.log("Client disconnected");
    })
})



server.listen(8000, () => { console.log("Server started!") }); 