const category = require('../models/category')
const multimedia = require('../models/multimedia')
const categoryController = require ('../controllers/categoryCtrl')
var fs = require('fs');
const pump = require('pump')

module.exports = function(app) {


<<<<<<< HEAD
    app.get('/category', categoryController.getCategorys);
    app.delete('/category', categoryController.deleteCategorys);
    app.post('/category', categoryController.createCategorys);
    app.put('/category', categoryController.updateCategorys);
    
=======
            })
        })
     /************************************* */
    app.delete('/category', (req, res) => {
        console.log("here params",req.query);
        if (!req.query.id || !req.query.client_id ) {
          return  res.status(400).send({
                sucess: false,
                msj: "Error al recibir data"
            })
        }
        const categoryData = {
            id: req.query.id,
            client_id:req.query.client_id
        }
        category.deleteCategorys(categoryData, (err, data) => {
            console.log(data, "data here")
            if (data) {
                res.send({
                    sucess: true,
                    data: data,
                    msj: "Categoria Eliminada con Exito"
                })

            } else {
                res.status(500).send({
                    sucess: false,
                    err: err,
                    msj: "no hay data"
                })
            }

        })
    })
        /************************************* */

        app.post('/insertCategory', function(req, reply) {
            const options = { limits: { fileSize: 1000000 } };
            const mp = req.multipart(handler, done, options)
            let id;
            let data;
            let test = {}; 
            mp.on('field', function(key, value) {
                test[key] = value;
                console.log('form-data', key, value)
            })
    
            function done(err) {
                console.log('up',test)
                console.log('upload completed',id)
                reply.code(200).send({ 
                    sucess: true,
                    msj: "Categoria guardada exitosamente"
                })
            }

            function handler(field, file, filename, encoding, mimetype) {
                console.log(field)
                if (!fs.existsSync(`./resources/${id}/`, {recursive: true}, err => {console.log(err)})) {
                    fs.mkdirSync(`./resources/${id}/`, {recursive: true}, err => {console.log(err)});
                }
                if (mimetype != 'image/jpeg') {
                   return reply.status(400).send({
                        sucess: false,
                        err: "El tipo de archivo no es permitido"
                    })
                } else {
                    if (pump(file, fs.createWriteStream(`./resources/${id}/${filename}`))) {
                        console.log(test)
                        const mediaData = {
                            client_id: test.id,
                            process_id: 123,
                            name: filename,
                            local: "0",
                            domain: 1,
                            path_data: `resources/${test.id}/${filename}`,
                            is_path_ico: 'asa',
                            path_ico: 'asdad',
                            category: 0,
                            media_type_id: 4,
                            metadata: filename,
                        }
                        
                        data =  JSON.parse(test.data);
                        const categoryData = {
                            category: data.name,                     
                            client_id: test.id,
                            status: data.status,
                            path_image:`resources/${test.id}/${filename}`,
                            description:data.description
                           
                        }  
                        console.log(categoryData)
                        category.Insertcategorys(categoryData,(err,data) =>{
                            if (data) {
                                console.log(data)
                            }else{
                                console.log(err)
                            }
                        })
    
                        
                        multimedia.saveVideos(mediaData, (err, data) => {
                            if (data) {
                                console.log(data)
    
                            } else {
                               return res.status(500).json({
                                    sucess: false,
                                    msj: "No se pudo crear la imagen"
                                })
                            }
                        })
                    } else {
    
                    }
    
                }
            }
        })
    /************************************* */

    app.post('/updateCategory', function(req, reply) {
        const options = { limits: { fileSize: 1000000 } };
        const mp = req.multipart(handler, done, options)
        let data;
        let test = {}; 
        mp.on('field', function(key, value) {
            test[key] = value;
            console.log('form-data', key, value)
        })

        function done(err) {
            console.log('up',test)
            if(  typeof test.media === 'string' ){
                save();
            }
            console.log('upload completed')
            reply.code(200).send({ sucess: "Guardado Exitoso" })
        }

        function save(){
            console.log(test.catId);
            data=  JSON.parse(test.data);
            const categoryData = {
                category: data.name,
                id:test.catId,
                client_id: test.id,
                status: data.status,
                path_image:data.image,
                description:data.description
               
            }  
            category.updatecategorys(categoryData,(err,data) =>{
                if (data) {
                    console.log(data)
                }else{
                    console.log(err)
                }
            })
            console.log("guardo sin crear archivo",categoryData);
               
        }

        function handler(field, file, filename, encoding, mimetype) {
            let id = test.id;
           console.log("1");
            if (!fs.existsSync(`./resources/${id}/`, {recursive: true}, err => {console.log(err)})) {
                fs.mkdirSync(`./resources/${id}/`, {recursive: true}, err => {console.log(err)});
                console.log("SI SE SUPONE QUE CREO LA CARPETA")
            }
            if (mimetype != 'image/jpeg') {
                reply.status(400).send({
                    sucess: false,
                    err: "El tipo de archivo no es permitido"
                })
            } else {
                console.log("2");
                if (pump(file, fs.createWriteStream(`./resources/${id}/${filename}`))) {
                    console.log("SI SE SUPONE QUE CREO LA image")
                    const mediaData = {
                        client_id: id,
                        process_id: 123,
                        name: filename,
                        local: "0",
                        domain: 1,
                        path_data: `resources/${id}/${filename}`,
                        is_path_ico: 'asa',
                        path_ico: 'asdad',
                        category: 0,
                        media_type_id: 4,
                        metadata: filename,
                    }
                    console.log(`resources/${id}/${filename}`)
                    data =  JSON.parse(test.data);
                    const categoryData = {
                        category: data.name,
                        id:test.catId,
                        client_id: test.id,
                        status: data.status,
                        path_image:`resources/${id}/${filename}`,
                        description:data.description
                       
                    }  
                    console.log(categoryData)
                    category.updatecategorys(categoryData,(err,data) =>{
                        if (data) {
                            console.log(data)
                        }else{
                            console.log(err)
                        }
                    })

                    
                    multimedia.saveVideos(mediaData, (err, data) => {
                        if (data) {
                            console.log(data)

                        } else {
                            res.status(500).json({
                                sucess: false,
                                err: err
                            })
                        }
                    })
                } else {
                    console.log("1");
                    res.status(500).json({
                        sucess:"Ocurrio un error no creo nada",
                        err: err
                    })
                }

            }
        }
    })

    /****************************************** */
    app.get('/subcategory', (req, res) => {
            console.log("here params")
            const userData = {
                id: 3,
                //req.query.id
                // category_id: req.body.category_id,
                // name: req.body.name

            }
            category.getsubcategory(userData, (err, data) => {
                console.log(data, "data here")
                if (data) {
                    console.log(data)
                    res.send({
                        sucess: true,
                        data: data
                    })

                } else {
                    res.status(500).send({
                        sucess: false,
                        err: err,
                        msj: "no hay data"
                    })
                }

            })
        })
        /************************************* */
    app.post('/category/upload', function(req, reply) {
        const mp = req.multipart(handler, done)
        let textData = {
            description: "",
            id: "",
            category: ""
        };
        mp.on('field', function(key, value) {
            switch (key.toLowerCase()) {
                case "description":
                    textData.description = value
                    break;
                case "id":
                    textData.id = value
                    break;
                case "category":
                    textData.category = value
                    break;

                default:
                    break;
            }

            console.log('form-data', key, value)
        })

        function done(err) {
            console.log('upload completed')
            reply.code(200).send({ sucess: "Guardado Exitoso" })
        }


        function handler(field, file, filename, encoding, mimetype) {
            if (!fs.existsSync(`resources/${textData.id}/`)) {
                fs.mkdirSync(`resources/${textData.id}/`);
            }
            if (mimetype != 'image/jpeg') {
                reply.status(400).send({
                    sucess: false,
                    err: "El tipo de archivo no es permitido"
                })
            } else {
                if (pump(file, fs.createWriteStream(`resources/${textData.id}/${filename}`))) {
                    const userData = {
                        client_id: textData.id,
                        path_image: `resources/${textData.id}/${filename}`,
                        description: textData.description,
                        category: textData.category,
                    }
                    console.log(userData)
                    category.Insertcategorys(userData, (err, data) => {
                        if (data) {
                            console.log(data)

                        } else {
                            res.status(500).json({
                                sucess: false,
                                err: err
                            })
                        }
                    })

                } else {

                }

            }
        }
    })

    /*******************SUBIDA DE PDFS************************** */
    app.post('/upload/multimedia/pdf', (req, res) => {
        console.log(req.files)
        let EDFile = req.files.file
        let id = req.body.id
        if (!fs.existsSync(`resources/${id}/`)) {
            fs.mkdirSync(`resources/${id}/`);
        }
        EDFile.mv(`resources/${id}/${EDFile.name}`, err => {
            if (err) {
                return res.status(500).send({ message: err, data: "Mensajes" })
            } else {
                const userData = {
                    client_id: req.body.id,
                    process_id: 121312,
                    name: req.files.file.name,
                    local: "0",
                    domain: 1,
                    path_data: `resources/${id}/${EDFile.name}`,
                    is_path_ico: 'asa',
                    path_ico: 'asdad',
                    category: 0,
                    media_type_id: 4,
                    metadata: 'Video de perrito',
                }
                console.log(userData)
                multimedia.saveVideos(userData, (err, data) => {
                    if (data) {
                        console.log(data)

                    } else {
                        res.status(500).json({
                            sucess: false,
                            err: err
                        })
                    }
                })

                return res.status(200).send({ message: 'File upload' })
            }


        })
    })


    /************************************************** */
    /*******************SUBIDA DE PDFS************************** */
    app.post('/upload/multimedia/imagenes', (req, res) => {
        console.log(req.files)
        let EDFile = req.files.file
        let id = req.body.id
        if (!fs.existsSync(`resources/${id}/imagenes`)) {
            fs.mkdirSync(`resources/${id}/imagenes`);
        }
        EDFile.mv(`resources/${id}/${EDFile.name}`, err => {
            if (err) {
                return res.status(500).send({ message: err, data: "Mensajes" })
            } else {
                const userData = {
                    client_id: req.body.id,
                    process_id: 121312,
                    name: req.files.file.name,
                    local: "0",
                    domain: 1,
                    path_data: `resources/${id}/${EDFile.name}`,
                    is_path_ico: 'asa',
                    path_ico: 'asdad',
                    category: 0,
                    media_type_id: 4,
                    metadata: 'Video de perrito',
                }
                console.log(userData)
                multimedia.saveVideos(userData, (err, data) => {
                    if (data) {
                        console.log(data)

                    } else {
                        res.status(500).json({
                            sucess: false,
                            err: err
                        })
                    }
                })

                return res.status(200).send({ message: 'File upload' })
            }


        })
    })
>>>>>>> e8dd3e43cdb2027212074e6bad6ae337416029b8

  

       }