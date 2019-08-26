const multimedia = require('../models/multimedia')
const subCategory = require('../models/subCategory')
const mjs = require('../static/messages');
const funciones = require('../global/funciones')
let multimediaController = {};


    multimediaController.createSlider= (req,res) =>{
   
    return funciones.createSlider(req,res);

   }

   multimediaController.getSlider= (req,res) =>{
    //console.log(req.query.id)
    if(!req.query.id) return res.send(400);
    let Slider = {
     client_id : req.query.id
    }  
    multimedia.getSlider(Slider  ,(err,data) =>{
     if(!data)
     res.status(500).send({sucess: false,err: err,msj: "no hay data"});
               
     res.send({sucess: true,data: data,msj: "Slider exitosamente"})
    })
 
   }

   multimediaController.deleteSlider= (req,res) =>{
    //console.log(req.query.id)
    if(!req.query.id) return res.send(400);
    let Slider = {
     client_id : req.query.client_id,
     id: req.query.id
    }  
    multimedia.deleteSlider(Slider  ,(err,data) =>{
     if(!data)
     res.status(500).send({sucess: false,err: err,msj: "no hay data"});
               
     res.send({sucess: true,data: data,msj: "Slider exitosamente"})
    })
 
   }


module.exports = multimediaController;