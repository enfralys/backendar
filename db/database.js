const mysql = require('mysql2/promise');
const pool =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Dev@2019_R1',
    database: 'backend'
});

module.exports = pool