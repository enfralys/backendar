const mysql = require('mysql')
const configs = require('../configs')

connection = mysql.createConnection(configs.mysqlData())

let multimediaModel = {

}
multimediaModel.saveVideos = (userData, callback) => {
    if (connection) {
        connection.query(
            'INSERT INTO media SET ?', userData,
            (err, result) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, {
                        'insertId': result.insertId
                    })
                }
            }
        )
    }
}

multimediaModel.createSlider = (data, callback) => {
    if (connection) {
        connection.query(
            'INSERT INTO slider SET ?', data,
            (err,rows)=> {
                if(err) throw err;
                const callbackResult = !rows.length ? { data :false } : rows;
                callback(null,callbackResult)
            }
        )
    }
}

multimediaModel.getSlider = (data, callback) => {
    if (connection) {
        connection.query('SELECT s.`id`,s.`media_id`, s.`name`, s.`client_id`,m.path_data FROM `slider` s INNER JOIN media m ON s.`media_id` = m.id and s.`client_id` =' + `${connection.escape(data.client_id)}`, data,
            (err,rows)=> {
                if(err) throw err;
                const callbackResult = !rows.length ? { data :false } : rows;
                callback(null,callbackResult)
            }
        )
    }
}

multimediaModel.deleteSlider = (data, callback) => {
    if (connection) {
        connection.query(`DELETE FROM slider where client_id = ${connection.escape(data.client_id)} and id = ${connection.escape(data.id)} `,
            (err,rows)=> {
                if(err) throw err;
                const callbackResult = !rows.length ? { data :false } : rows;
                callback(null,callbackResult)
            }
        )
    }
}

multimediaModel.getMultimedia = (userData, callback) => {
    if (`SELECT * FROM 'media'RIGHT JOIN media_type ON media.media_type_id = media_type.media_type_id WHERE client_id = ?
    ${connection.escape(userData.client_id)}`) {

    } else {

    }
}

module.exports = multimediaModel;