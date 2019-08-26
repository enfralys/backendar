const mysql = require('mysql')
const configs = require('../configs')
connection = mysql.createConnection(configs.mysqlData())

let subCategoryModel = {}

    subCategoryModel.create = (data, callback)  => {
        console.log(data, "alv we");
        if(connection) {
             connection.query("INSERT INTO `sub-category`(`client_id`, `category_id`, `name`,`description`,`status`) VALUES" + `(${data.client_id},${data.category_id},'${data.name}','${data.description}','${data.status}')`,
            (err,rows)=> {
                if(err) throw err;
                const callbackResult = !rows.length ? { data :false } : rows;
                callback(null,callbackResult)
            }

            )} 
    }

    /***********************************************/
    subCategoryModel.delete = (data, callback)  => {
        if(connection) {
            connection.query("DELETE FROM `sub-category` where " + `client_id = ${connection.escape(data.client_id)} and id = ${connection.escape(data.id)} `,
            (err,rows)=> {
                console.log(rows);
                if(err) throw err;
                const callbackResult = !rows.length ? { data :false } : rows;
                callback(null,callbackResult)
            }

            )} 
    }
    /***********************************************/
    
    subCategoryModel.update = (data, callback)  => {
        console.log(data, "alv we");
        if(connection) {
            connection.query("  UPDATE `sub-category` SET ? where "+ ` client_id = ${connection.escape(data.client_id)} and id = ${connection.escape(data.id)} `, data,
            (err,rows)=> {
                if(err) throw err;
                const callbackResult = !rows.length ? { data :false } : rows;
                callback(null,callbackResult)
            }

            )} 
    }
     /***********************************************/
    
     subCategoryModel.getById = (data, callback)  => {
        console.log(data, "alv we");
        if(connection) {
            connection.query('SELECT s.`id`,s.`category_id`, s.`name`,s.`description`,s.`status`,categorys.category FROM `sub-category` s INNER JOIN categorys on categorys.id = s.`category_id` and s.`client_id` =' + `${connection.escape(data.client_id)}`+  'and s.`category_id` = ' +`${connection.escape(data.id)}`,
            (err,rows)=> {
                if(err) throw err;
                console.log(rows.length)
                const callbackResult = !rows.length ? { data :false, } : rows;
                callback(null,callbackResult);
                console.log(callbackResult);
            }

            )} 
    }
    /***********************************************/
    
    subCategoryModel.get = (data, callback)  => {
        console.log(data, "alv we");
        if(connection) {
            connection.query('SELECT s.`id`,s.`category_id`, s.`name`,s.`description`,s.`status`,categorys.category FROM `sub-category` s INNER JOIN categorys on categorys.id = s.`category_id` and s.`client_id` =' + `${connection.escape(data.client_id)}`,
            (err,rows)=> {
                if(err) throw err;
                const callbackResult = !rows.length ? { data :false } : rows;
                callback(null,callbackResult)
            }

            )} 
    }
    module.exports = subCategoryModel;


