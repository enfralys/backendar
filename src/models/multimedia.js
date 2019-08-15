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


multimediaModel.getMultimedia = (userData, callback) => {
    if (`SELECT * FROM 'media'RIGHT JOIN media_type ON media.media_type_id = media_type.media_type_id WHERE client_id = ?
    ${connection.escape(userData.client_id)}`) {

    } else {

    }
}

module.exports = multimediaModel;