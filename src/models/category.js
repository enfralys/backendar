const mysql = require('mysql')


connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'backend'
})

let categoryModel = {

}


categoryModel.categorys = (userData, callback) => {
        if (connection) {
            connection.query(`SELECT id,category,path_image,description,status FROM categorys  where client_id = ${connection.escape(userData.id)}`,
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
    ///*/////////////////////


categoryModel.Insertcategorys = (categoryData, callback) => {
    if (connection) {
        connection.query(`INSERT INTO CATEGORYS SET ? `, categoryData,
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

categoryModel.updatecategorys = (categoryData, callback) => {
    if (connection) {
        connection.query(` UPDATE CATEGORYS SET ? where client_id = ${connection.escape(categoryData.client_id)} and id = ${connection.escape(categoryData.id)} `, categoryData,
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

        }

    }
    /************************************* */
categoryModel.getsubcategory = (userData, callback) => {
    if (connection) {
        connection.query('SELECT `id`,`category_id`, `name` FROM `sub-category` where `client_id` =' + `${connection.escape(userData.id)}`,
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

categoryModel.getCategory = (userData, callback) => {
    if (connection) {
        connection.query('SELECT `id`, `category`, `client_id`, `path_image`,`name` FROM `categorys` WHERE `client_id` =' + `${connection.escape(userData.id)}`),
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
            }
    }
}




module.exports = categoryModel;