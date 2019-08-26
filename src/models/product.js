const mysql = require('mysql')
const configs = require('../configs')
connection = mysql.createConnection(configs.mysqlData())

let productModel = {}


productModel.getProduct = (data, callback)  => {
    if(connection) {
        connection.query('SELECT s.`id`, s.`sub_category_id`,s.`id_media`,s.`product`,s.`status` ,s.`description`,media.path_data FROM `products` s INNER JOIN media on media.id = s.`id_media` and s.`client_id` =' + `${connection.escape(data.client_id)}`,
        (err,rows)=> {
            if(err) throw err;
            const callbackResult = !rows.length ? { data :false } : rows;
            callback(null,callbackResult)
        }

        )} 
}

productModel.getProductById = (data, callback)  => {
    if(connection) {
        connection.query('SELECT s.`id`, s.`sub_category_id`,s.`id_media`,s.`product`,s.`status` ,s.`description`,media.path_data FROM `products` s INNER JOIN media on media.id = s.`id_media` and s.`client_id` =' + `${connection.escape(data.client_id)}` +  'and s.`id` = ' +`${connection.escape(data.id)}`,
        (err,rows)=> {
            if(err) throw err;
            const callbackResult = !rows.length ? { data :false } : rows[0];
            callback(null,callbackResult)
        }

        )} 
}


productModel.createProduct = (data, callback)  => {
    if(connection) {
        connection.query('INSERT INTO products SET ?', data,
        (err,rows)=> {
            if(err) throw err;
            const callbackResult = !rows.length ? { data :false } : rows;
            callback(null,callbackResult)
        }

        )} 
}

productModel.saveProdItem = (data, callback)  => {
    if(connection) {
        connection.query('INSERT INTO products_media SET ?', data,
        (err,rows)=> {
            if(err) throw err;
            const callbackResult = !rows.length ? { data :false } : rows;
            callback(null,callbackResult)
        }

        )} 
}

productModel.deleteProduct = (data, callback) => {
    if (connection) {
        connection.query(` DELETE FROM products where client_id = ${connection.escape(data.client_id)} and id = ${connection.escape(data.id)} `,
        (err,rows)=> {
            if(err) throw err;
            const callbackResult = !rows.length ? { data :false } : rows;
            callback(null,callbackResult)
        }

        )} 
}

productModel.updateProduct = (data, callback)  => {
    if(connection) {
        connection.query(` UPDATE products SET ? where client_id = ${connection.escape(data.client_id)} and id = ${connection.escape(data.id)} `, data,
        (err,rows)=> {
            if(err) throw err;
            const callbackResult = !rows.length ? { data :false } : rows;
            callback(null,callbackResult)
        }

        )} 
}
productModel.getProductItems = (data, callback)  => {
    if(connection) {
        connection.query('SELECT products_media.type,products_media.path_data,products_media.name FROM `products_media` INNER JOIN products on  products.client_id =' + `${connection.escape(data.client_id)}` +  'and products_media.product_id  = ' +`${connection.escape(data.id)}`,
        (err,rows)=> {
            console.log(rows)
            if(err) throw err;
            const callbackResult = !rows.length ? { data :false } : rows;
            callback(null,callbackResult)
        }

        )} 
}

module.exports = productModel;