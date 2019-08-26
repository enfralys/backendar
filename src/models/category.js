const mysql = require('mysql');
const configs = require('../configs');
const subCategory = require('../models/subCategory');

   console.log(configs, "aja");

   connection = mysql.createConnection(configs.mysqlData());

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
categoryModel.updateCategorys = (categoryData, callback) => {
    if (connection) {
        connection.query(` UPDATE categorys SET ? where client_id = ${connection.escape(categoryData.client_id)} and id = ${connection.escape(categoryData.id)} `, categoryData,
        (err,rows)=> {
            if(err) throw err;
            const callbackResult = !rows.length ? { data :false } : rows;
            callback(null,callbackResult)
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