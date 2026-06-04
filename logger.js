const fs = require("fs");
const os = require("os");
const EventEmitter = require('events');

class Logger extends EventEmitter{
    log(message){
        this.emit("message", {message});
    }
}

const logger = new Logger();
const filepath = "./eventlogger.txt";

const logToFile = (event)=>{
    const message = `${new Date().toISOString()} - ${event.message} \n`
    fs.appendFileSync(filepath,message);
}

logger.on("message",logToFile);

setInterval(() => {
    const memoryUsage = os.freemem() / os.totalmem() *100;
    logger.log(`memory used is ${memoryUsage.toFixed(2)}`)
}, 1000);

logger.log("application has started!!!");
