const subCategory = require('../models/subCategory')


let subCategoryController = {};

subCategoryController.create = (req,res) =>{
        console.log(req.query,req.body.name, "aja")
       if(!req.query.id || !req.body) return res.send(400);
       const body = req.body;
       let sucCatData = {
        client_id : req.query.id,
        category_id: body.params.category,
        name:body.params.name
       }  
     
       subCategory.create(sucCatData  ,(err,data) =>{
        console.log(data)
        if(data){
                res.send({
                        sucess: true,
                        data: data,
                    })
               }else{
                res.status(500).send({
                        sucess: false,
                        err: err,
                        msj: "no hay data"
                    })
               }
       })


}






module.exports = subCategoryController;