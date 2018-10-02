const EventEmitter = require('events');

class Server extends EventEmitter{
    constructor(client){
        super();
        this.tasks = [];
        this.taskId = 1;
        process.nextTick(()=>{
            this.emit(
                'response',
                'Type a command (help to list commands)'
            );
        })
        client.on('command',(command,arg)=>{
            switch(command){
                case 'help':
                case 'add':
                case 'ls':
                case 'delete':
                    this[command](arg);
                    break;
                default:
                    this.emit('response','Unknown command');
            }
        })
    }
    help(){
        this.emit('response',  `Available Commands:
    add [task]
    ls
    delete :id    
        `);
    }
    add(arg){
        arg = arg.join(' ')
        this.tasks.push({task:arg,id:this.taskId});
        this.taskId++;
        this.emit('response', `${arg} added successfully!`);
    }
    ls(){
        let ls='';
        this.tasks.map(e=>{
            ls+= e.id + ' ' + e.task + '\n';
        })
        this.emit('response', ls);
    }
    delete(arg){
        this.tasks = this.tasks.filter(e=>e.id!=arg)
        this.emit('response',`Deleted ${arg}`);
    }
}

module.exports = (client)=> new Server(client);