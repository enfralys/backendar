const subCategory = require('../models/subCategory')
const mjs = require('../static/messages');
     
let subCategoryController = {};
/*/*** Metodo para Crear sub categoria*** */
subCategoryController.create = (req,res) =>{
        console.log(req.query,req.body, "aja")
       if(!req.query.id || !req.body) return res.send(400);
       const body = req.body;
       let sucCatData = {
        client_id : req.query.id,
        category_id: body.params.category,
        name:body.params.name,
        description:body.params.description,
        status: body.params.status || 1 ,
       }  
       subCategory.create(sucCatData  ,(err,data) =>{
        console.log(data,"Aqui linea 17")
        if(!data)
        res.status(500).send({sucess: false,err: err,msj: mjs.module.N1 });
                  
        res.send({sucess: true,data: data,msj: `Subcategoria ${mjs.module.E1}`})
       })
}
/*/*** Metodo para Eliminar sub categoria*** */
subCategoryController.delete = (req,res) =>{
        console.log(req.query)
       if(!req.query.id || !req.query.client_id) return res.send(400);
       const sucCatData = {
        id: req.query.id,
        client_id:req.query.client_id
    }
    subCategory.delete(sucCatData, (err, data) => {
        console.log(data,"Aqui linea 17")
        if(!data)
        res.status(500).send({sucess: false,err: err,msj: "no hay data"});
                  
        res.send({sucess: true,data: data,msj: "Subcategoria eliminada exitosamente"})
       })
}

/*/*** Metodo para Actualizar sub categoria*** */
subCategoryController.update = (req,res) =>{
       console.log(req.query,req.body, "aja")
       if(!req.query.id || !req.query.client_id) return res.send(400);
       const body = req.body;
       let sucCatData = {
        id: req.query.id,
        client_id : req.query.client_id,
        category_id: body.category,
        name:body.name,
        description:body.description,
        status: body.status || 1 ,
       }  
       subCategory.update(sucCatData  ,(err,data) =>{
        console.log(data,"Aqui linea 17")
        if(!data)
        res.status(500).send({sucess: false,err: err,msj: "no hay data"});
                  
        res.send({sucess: true,data: data,msj: "Subcategoria Guardada Exitosamente"})
       })
}

/*/*** Metodo para traer sub categoria*** */
subCategoryController.get = (req,res) =>{
        //console.log(req.query,req.body.name, "aja")
       if(!req.query.id) return res.send(400);
       let sucCatData = {
        client_id : req.query.id
       }  
       subCategory.get(sucCatData  ,(err,data) =>{
        console.log(data,"Aqui linea 17")
        if(!data)
        res.status(500).send({sucess: false,err: err,msj: "no hay data"});
                  
        res.send({sucess: true,data: data,msj: "Subcategoria Guardada Exitosamente"})
       })
}

subCategoryController.getById = (req,res) =>{
      // console.log(req.query)
      if(!req.query.id || !req.query.catId) return res.send(400);
      let sucCatData = {
       client_id : req.query.id,
       id: req.query.catId
      }        
     //  console.log(data,"Aqui linea 17")
      subCategory.getById(sucCatData  ,(err,data) =>{

       if(data == false)res.status(500).send({sucess: false,err: err,msj: "no hay data"});
                 
       res.send({sucess: true,datos: data,msj: "Subcategoria envida exitosamente"})
      })
}
module.exports = subCategoryController;