const mysql = require('mysql')



let configs = {}



configs.mysqlData = () => {
    return {
        host: 'localhost',
        user: 'root',
        password: 'Dev@2019_R1',
        database: 'backend'
    }
}

module.exports = configs;