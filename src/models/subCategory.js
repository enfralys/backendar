const mysql = require('mysql')
const configs = require('../configs')

connection = mysql.createConnection(configs.mysqlData())

let subCategoryModel = {}

    subCategoryModel.create = (data, callback)  => {

        if(connection) {
            connection.query("(INSERT INTO 'sub-category' SET  ?)",data,
            (err,rows)=> {
                if(err) throw err;
                const callbackResult = !rows.length ? { data :false } : rows;
                callback(null,callbackResult)
            }

            )} 
    
    }

    module.exports = subCategoryModel;


