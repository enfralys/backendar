<<<<<<< HEAD
const subcategoryController = require ('../controllers/subcategoryCtrl');
module.exports = function(app) {

    app.get('/subcategory', subcategoryController.get);
    app.post('/subcategory', subcategoryController.create);
    app.put('/subcategory', subcategoryController.update);
    app.delete('/subcategory', subcategoryController.delete);
    app.get('/subcategorybyid', subcategoryController.getById);
=======
const category = require('../models/category')
const multimedia = require('../models/multimedia')
const categoryController = require ('../controllers/categoryCtrl')
const subcategoryController = require ('../controllers/subcategoryCtrl');
var fs = require('fs');
const pump = require('pump')
module.exports = function(app) {


    app.post('/subcategory', subcategoryController.create);


>>>>>>> e8dd3e43cdb2027212074e6bad6ae337416029b8
}