//info for debug
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const os = require('os');
const path = require('path')
const fs = require('fs');
const fsPromises = require('fs').promises;


console.log();
console.log("### logEvents.js - logs all events and stores them in logs folder ###")
console.log();

//for debugging purposes
//setTimeout(() => {
//    console.log(path.parse(__filename))
//}, 1000);

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
    } catch(err){
        console.log(err);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}

module.exports = { logger, logEvents };

