const subcategoryController = require ('../controllers/subcategoryCtrl');
module.exports = function(app) {

    app.get('/subcategory', subcategoryController.get);
    app.post('/subcategory', subcategoryController.create);
    app.put('/subcategory', subcategoryController.update);
    app.delete('/subcategory', subcategoryController.delete);
    app.get('/subcategorybyid', subcategoryController.getById);
}