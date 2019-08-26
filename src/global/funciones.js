const mysql = require('mysql')
const category = require('../models/category')
const product = require('../models/product')
const multimedia = require('../models/multimedia')
var fs = require('fs');
const pump = require('pump')
const mjs = require('../static/messages');


    let funciones = {}



    funciones.createCategorys= (req,res)=>{
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
            res.code(200).send({ 
                sucess: true,
                msj: "Categoria guardada exitosamente"
            })
        }
    
        function handler(field, file, filename, encoding, mimetype) {
            let id = test.id;
            if (!fs.existsSync(`./resources/${id}/`, {recursive: true}, err => {console.log(err)})) {
                fs.mkdirSync(`./resources/${id}/`, {recursive: true}, err => {console.log(err)});
            }
            if (mimetype != 'image/jpeg') {
               return res.status(400).send({
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
                    category.createCategorys(categoryData,(err,data) =>{
                        if(!data)
                        res.status(500).send({sucess: false,err: err,msj: mjs.module.N1 });
                                  
                        res.send({sucess: true,data: data,msj: `Categoria ${mjs.module.E1}`})
                    })
    
                    
                    multimedia.saveVideos(mediaData, (err, data) => {
                        if(!data)
                        res.status(500).send({sucess: false,err: err,msj: mjs.module.N1 });
                                  
                        res.send({sucess: true,data: data,msj: `Categoria ${mjs.module.E1}`})
                    })
                } else {
    
                }
    
            }
        }
    }

    funciones.updateCategorys = (req,res)=>{
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
            res.code(200).send({ 
                sucess: true,
                msj: "Categoria actualizada exitosamente"
            })
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
            category.updateCategorys(categoryData,(err,data) =>{
                if(!data)
                res.status(500).send({sucess: false,err: err,msj: mjs.module.N1 });
                          
                res.send({sucess: true,data: data,msj: `Categoria ${mjs.module.E1}`})
            
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
                res.status(400).send({
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
                    category.updateCategorys(categoryData,(err,data) =>{
                        if(!data)
                res.status(500).send({sucess: false,err: err,msj: mjs.module.N1 });
                          
                res.send({sucess: true,data: data,msj: `Categoria ${mjs.module.E1}`})
                    })

                    
                    multimedia.saveVideos(mediaData, (err, data) => {
                        if(!data)
                        res.status(500).send({sucess: false,err: err,msj: mjs.module.N1 });
                                  
                        res.send({sucess: true,data: data,msj: `Categoria ${mjs.module.E1}`})
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
    }
    funciones.createProduct = (req,res)=>{
        const options = { limits: { fileSize: 1000000 } };
        const mp = req.multipart(handler, done, options)
        let datos;
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
            res.code(200).send({ 
                sucess: true,
                msj: "Categoria actualizada exitosamente"
            })
        }

        function handler(field, file, filename, encoding, mimetype) {
            let id = test.id;
           console.log("1");
            if (!fs.existsSync(`./resources/${id}/`, {recursive: true}, err => {console.log(err)})) {
                fs.mkdirSync(`./resources/${id}/`, {recursive: true}, err => {console.log(err)});
                console.log("SI SE SUPONE QUE CREO LA CARPETA")
            }
            if (mimetype != 'image/jpeg') {
                res.status(400).send({
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
                    let media_id;
                    multimedia.saveVideos(mediaData, (err, data) => {
                     if(!data)
                            res.status(500).send({sucess: false,err: err,msj: mjs.module.N1 });
                            datos=  JSON.parse(test.data);         
                        const productData = {
                        product: datos.name,
                        client_id: test.id,
                        id_media: data.insertId,
                        status: datos.status,
                        description: datos.description,
                        sub_category_id : datos.subcategory
                        }  

                    product.createProduct(productData,(err,data) =>{
                    if(!data)
                    res.status(500).send({sucess: false,err: err,msj: mjs.module.N1 });
                              
                    res.send({sucess: true,data: data,msj: `Categoria ${mjs.module.E1}`})
                        })
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
    }
    funciones.createSlider = (req,res)=>{
        const options = { limits: { fileSize: 1000000 } };
        const mp = req.multipart(handler, done, options)
        let datos;
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
            res.code(200).send({ 
                sucess: true,
                msj: "Categoria actualizada exitosamente"
            })
        }

        function handler(field, file, filename, encoding, mimetype) {
            let id = test.id;
           console.log("1");
            if (!fs.existsSync(`./resources/${id}/`, {recursive: true}, err => {console.log(err)})) {
                fs.mkdirSync(`./resources/${id}/`, {recursive: true}, err => {console.log(err)});
                console.log("SI SE SUPONE QUE CREO LA CARPETA")
            }
            if (mimetype != 'image/jpeg') {
                res.status(400).send({
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
                    let media_id;
                    multimedia.saveVideos(mediaData, (err, data) => {
                     if(!data)
                            res.status(500).send({sucess: false,err: err,msj: mjs.module.N1 });
                            datos=  JSON.parse(test.data);         
                         const categoryData = {
                        name: datos.name,
                        client_id: test.id,
                        media_id: data.insertId,
                        }  

                    multimedia.createSlider(categoryData,(err,data) =>{
                    if(!data)
                    res.status(500).send({sucess: false,err: err,msj: mjs.module.N1 });
                              
                    res.send({sucess: true,data: data,msj: `Categoria ${mjs.module.E1}`})
                        })
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
    }
    funciones.updateProduct = (req,res)=>{
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
            res.code(200).send({ 
                sucess: true,
                msj: "Producto actualizada exitosamente"
            })
        }

        function save(){
            datos=  JSON.parse(test.data);
            console.log(console.log());
            const productData = {
                product: datos.name,
                client_id: test.id,
                id:test.productId,
                id_media: datos.image,
                status: datos.status,
                description: datos.description,
                sub_category_id : datos.subcategory
                } 
            product.updateProduct(productData,(err,data) =>{
                if(!data)
                res.status(500).send({sucess: false,err: err,msj: mjs.module.N1 });
                          
                res.send({sucess: true,data: data,msj: `Categoria ${mjs.module.E1}`})
            
            })
            console.log("guardo sin crear archivo",productData);
               
        }

        function handler(field, file, filename, encoding, mimetype) {
            let id = test.id;
           console.log("1");
            if (!fs.existsSync(`./resources/${id}/`, {recursive: true}, err => {console.log(err)})) {
                fs.mkdirSync(`./resources/${id}/`, {recursive: true}, err => {console.log(err)});
                console.log("SI SE SUPONE QUE CREO LA CARPETA")
            }
            if (mimetype != 'image/jpeg') {
                res.status(400).send({
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
              
                    multimedia.saveVideos(mediaData, (err, data) => {
                        if(!data)
                            res.status(500).send({sucess: false,err: err,msj: mjs.module.N1 });
                            datos=  JSON.parse(test.data);         
                           const productData = {
                            product: datos.name,
                            client_id: test.id,
                            id:test.productId,
                            id_media: data.insertId,
                            status: datos.status,
                            description: datos.description,
                            sub_category_id : datos.subcategory
                           }  
   
                       product.updateProduct(productData,(err,data) =>{
                       if(!data)
                       res.status(500).send({sucess: false,err: err,msj: mjs.module.N1 });
                                 
                       res.send({sucess: true,data: data,msj: `Categoria ${mjs.module.E1}`})
                           })
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
    }


    funciones.createProductItems = (req,res)=>{
        const options = { limits: { fileSize: 1000000 } };
        const mp = req.multipart(handler, done, options)
        let datos;
        let test = {}; 
        mp.on('field', function(key, value) {
            test[key] = value;
            console.log('form-data', key, value)
        })

        function done(err) {
            console.log('upload completed')
            res.code(200).send({ 
                sucess: true,
                msj: test.type + " Subido exitosamente"
            })
        }

        function handler(field, file, filename, encoding, mimetype) {
            let id = test.id;
           console.log("1");
           if(filename.length > 5) res.code(500).send({msj:"Nombre de archivo muy largo"}); console.log("Aqio") ;
            if (!fs.existsSync(`./resources/${id}/`, {recursive: true}, err => {console.log(err)})) {
                fs.mkdirSync(`./resources/${id}/`, {recursive: true}, err => {console.log(err)});
                console.log("SI SE SUPONE QUE CREO LA CARPETA")
            }
                console.log("2");
                if (pump(file, fs.createWriteStream(`./resources/${id}/${filename}`))) {
                    console.log("SI SE SUPONE QUE CREO LA image")
                    const mediaData = {                   
                        client_id:test.id,
                        type: test.type,
                        name:filename,
                        path_data:`/resources/${id}/${filename}`,
                        status:test.status || 1 ,
                        product_id: test.productId

                    }
                    let media_id;
                    product.saveProdItem(mediaData, (err, data) => {
                    if(!data)res.status(500).send({sucess: false,err: err,msj: mjs.module.N1 });
                              

                     
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


module.exports = funciones;