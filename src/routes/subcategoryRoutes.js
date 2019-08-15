const category = require('../models/category')
const multimedia = require('../models/multimedia')
const categoryController = require ('../controllers/categoryCtrl')
const subcategoryController = require ('../controllers/subcategoryCtrl');
var fs = require('fs');
const pump = require('pump')
module.exports = function(app) {


    app.post('/subcategory', subcategoryController.create);


}