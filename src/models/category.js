<<<<<<< HEAD
const mysql = require('mysql');
const configs = require('../configs');
const subCategory = require('../models/subCategory');

   console.log(configs, "aja");

   connection = mysql.createConnection(configs.mysqlData());
=======
const mysql = require('mysql')
const configs = require('../configs')

connection = mysql.createConnection(configs.mysqlData())
>>>>>>> e8dd3e43cdb2027212074e6bad6ae337416029b8

let categoryModel = {

}

categoryModel.getCategorys = (data, callback) => {
        if (connection) {
            connection.query(`SELECT id,category,path_image,description,status FROM categorys  where client_id = ${connection.escape(data.client_id)}`,
            (err,rows)=> {
                if(err) throw err;
                const callbackResult = !rows.length ? { data :false } : rows;
                callback(null,callbackResult);
            }

            )} 
    }
///*/////////////////////


categoryModel.createCategorys = (categoryData, callback) => {
    if (connection) {
        connection.query(`INSERT INTO categorys SET ? `, categoryData,
        (err,rows)=> {
            if(err) throw err;
            const callbackResult = !rows.length ? { data :false } : rows;
            callback(null,callbackResult)
        }

        )} 
}
 ///*/////////////////////
<<<<<<< HEAD
categoryModel.updateCategorys = (categoryData, callback) => {
    if (connection) {
        connection.query(` UPDATE categorys SET ? where client_id = ${connection.escape(categoryData.client_id)} and id = ${connection.escape(categoryData.id)} `, categoryData,
        (err,rows)=> {
            if(err) throw err;
            const callbackResult = !rows.length ? { data :false } : rows;
            callback(null,callbackResult)
=======
categoryModel.updatecategorys = (categoryData, callback) => {
    if (connection) {
        connection.query(` UPDATE categorys SET ? where client_id = ${connection.escape(categoryData.client_id)} and id = ${connection.escape(categoryData.id)} `, categoryData,
            (err, rows) => {
                if (err) {
                    throw err;
                } else {

                    if (rows.length == 0) {
                        callback(null, { data: false })
                    } else {
                        callback(null, rows)
                        console.log(rows)
                    }

                }
            })

    }

}
/************************************* */
categoryModel.deleteCategorys = (categoryData, callback) => {
    if (connection) {
        connection.query(` DELETE FROM categorys where client_id = ${connection.escape(categoryData.client_id)} and id = ${connection.escape(categoryData.id)} `, categoryData,
            (err, rows) => {
                if (err) {
                    throw err;
                } else {

                    if (rows.length == 0) {
                        callback(null, { data: false })
                    } else {
                        callback(null, rows)
                        console.log(rows)
                    }

                }
            })

    }

}
/************************************* */
categoryModel.Insertsubcategory = (userData, callback) => {
        if (connection) {
            connection.query('INSERT INTO `sub-category` SET  ?', userData,
                (err, rows) => {
                    if (err) {
                        throw err;
                    } else {

                        if (rows.length == 0) {
                            callback(null, { data: false })
                        } else {
                            callback(null, rows)
                            console.log(rows)
                        }

                    }
                })

>>>>>>> e8dd3e43cdb2027212074e6bad6ae337416029b8
        }

        )} 
}
/************************************* */
categoryModel.deleteCategorys = (categoryData, callback) => {
    if (connection) {
        connection.query(` DELETE FROM categorys where client_id = ${connection.escape(categoryData.client_id)} and id = ${connection.escape(categoryData.id)} `, categoryData,
        (err,rows)=> {
            if(err) throw err;
            const callbackResult = !rows.length ? { data :false } : rows;
            callback(null,callbackResult)
        }

        )} 
}



module.exports = categoryModel;