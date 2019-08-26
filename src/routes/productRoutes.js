const productController = require ('../controllers/productCtrl');
module.exports = function(app) {

    app.get('/product', productController.getProduct);
    app.put('/product', productController.updateProduct);
    app.delete('/product', productController.deleteProduct);
    app.get('/productbyid', productController.getProductById);
    app.post('/product', productController.createProduct);
    app.post('/productitems', productController.createProductItems);
    app.get('/productitems', productController.getProductItems);
}