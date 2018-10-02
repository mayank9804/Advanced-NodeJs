const EventEmitter = require('events');
const readline = require('readline');

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

const client = new EventEmitter();
const server = require('./server')(client)
server.on('response',(response)=>{
    process.stdout.write('\u001B[2J\u001B[0;0f');
    process.stdout.write(response);
    process.stdout.write('\n\>>>');
})

rl.on('line',(input)=>{
    [input,...args] = input.split(' ')
    client.emit('command',input,args);
})

setTimeout(()=>{
    console.log("Hello world")
},1000);
while(true){
    console.log("JS is sexy!")
};