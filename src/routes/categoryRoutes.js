const category = require('../models/category')
const multimedia = require('../models/multimedia')
const categoryController = require ('../controllers/categoryCtrl')
var fs = require('fs');
const pump = require('pump')

module.exports = function(app) {


    app.get('/category', categoryController.getCategorys);
    app.delete('/category', categoryController.deleteCategorys);
    app.post('/category', categoryController.createCategorys);
    app.put('/category', categoryController.updateCategorys);
    

  

       }