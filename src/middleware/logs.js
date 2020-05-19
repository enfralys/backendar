const SimpleNodeLogger = require('simple-node-logger');
logger = {};
optsErr= {
  logDirectory:'logs', // NOTE: folder must exist and be writable...
        fileNamePattern:'error-<DATE>.log',
        dateFormat:'YYYY.MM.DD'
},
logger.error = SimpleNodeLogger.createRollingFileLogger( optsErr );
optsInfo = {
  logDirectory:'logs', // NOTE: folder must exist and be writable...
  fileNamePattern:'info-<DATE>.log',
  dateFormat:'YYYY.MM.DD'
},
logger.info = SimpleNodeLogger.createRollingFileLogger( optsInfo );

optsGeneral = {
  logDirectory:'logs', // NOTE: folder must exist and be writable...
        fileNamePattern:'general-<DATE>.log',
        dateFormat:'YYYY.MM.DD'
},
logger.general = SimpleNodeLogger.createRollingFileLogger( optsGeneral );
module.exports = logger;
