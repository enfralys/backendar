const product = require('../models/product')
var fs = require('fs');
const multimedia = require('../models/multimedia')
const funciones = require('../global/funciones')
const mjs = require('../static/messages');


let productController = {}



productController.getProduct = (req,res) =>{
    //console.log(req.query.id)
    if(!req.query.id) return res.send(400);
    let productData = {
     client_id : req.query.id
    }  
    product.getProduct(productData  ,(err,data) =>{
     if(!data)
     res.status(500).send({sucess: false,err,msj: "no hay data"});
               
     res.send({sucess: true,data,msj: "Categoria exitosamente"})
    })
 }

 productController.getProductById = (req,res) =>{
   //console.log(req.query.id)
   if(!req.query.id) return res.send(400);
   let productData = {
    client_id : req.query.client_id,
    id :  req.query.id
   }  
   product.getProductById(productData  ,(err,data) =>{
    if(!data)
    res.status(500).send({sucess: false,err: err,msj: "no hay data"});
              
    res.send({sucess: true,data: data,msj: "Categoria exitosamente"})
   })
}

productController.getProductItems = (req,res) =>{
   //console.log(req.query.id)
   if(!req.query.id && !req.query.client_id) return res.send(400);
   let productData = {
    client_id : req.query.client_id,
    id :  req.query.id
   }  
   product.getProductItems(productData  ,(err,data) =>{
    if(data == false) res.status(500).send({sucess: false,err: err,msj: "no hay data"});        
    res.send({sucess: true,data: data,msj: "productos items cargados exitosamente"})
   })
}
productController.deleteProduct = (req,res) =>{
   console.log("framye")
   if(!req.query.id) return res.send(400);
   const productData = {
       id: req.query.id,
       client_id:req.query.client_id
   }  
   product.deleteProduct (productData  ,(err,data) =>{
       
    // console.log(data,"aja")
     if(!data)res.status(500).send({sucess: false,err: err,msj: "no hay data"});
      
     res.send({sucess: true,data: data,msj: "Producto eliminado exitosamente"})
   })
}

productController.updateProduct = (req,res) =>{
   //console.log(req.query.id)
   return funciones.updateProduct(req,res);
}

 productController.createProduct = (req,res) =>{
    //console.log(req.query.id)
    return funciones.createProduct(req,res);
 }



 productController.createProductItems = (req,res) =>{
   //console.log(req.query.id)
   return funciones.createProductItems(req,res);
}

module.exports = productController;


