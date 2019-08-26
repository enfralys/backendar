const category = require('../models/category')
var fs = require('fs');
const multimedia = require('../models/multimedia')
const funciones = require('../global/funciones')
const pump = require('pump')
const mjs = require('../static/messages');

let categoryController = {}

/*/*** Metodo para traer categoria*** */
categoryController.getCategorys = (req,res) =>{
   //console.log(req.query.id)
   if(!req.query.id) return res.send(400);
   let sucCatData = {
    client_id : req.query.id
   }  
   category.getCategorys(sucCatData  ,(err,data) =>{
    if(!data)
    res.status(500).send({sucess: false,err: err,msj: "no hay data"});
              
    res.send({sucess: true,data: data,msj: "Categoria exitosamente"})
   })
}
/*/*** Metodo para Eliminar categoria*** */
categoryController.deleteCategorys = (req,res) =>{
    console.log("framye")
    if(!req.query.id) return res.send(400);
    const sucCatData = {
        id: req.query.id,
        client_id:req.query.client_id
    }  
    category.deleteCategorys (sucCatData  ,(err,data) =>{
        
     // console.log(data,"aja")
      if(!data)res.status(500).send({sucess: false,err: err,msj: "no hay data"});
       
      res.send({sucess: true,data: data,msj: "Categoria eliminada Exitosamente"})
    })
 }
 /*/*** Metodo para crear categoria*** */
    categoryController.createCategorys= (req,res) =>{
   
     return funciones.createCategorys(req,res);

    }
    
     /*/*** Metodo para Actualizar categoria*** */
     categoryController.updateCategorys= (req,res) =>{
   
        return funciones.updateCategorys(req,res);
   
       }








module.exports = categoryController;