const functions = require('../controllers/doroti')

module.exports = function(app) {



    app.post('/api/', functions.autorizar);
    app.post('/api/setTemp', functions.set_conf_temp);
    app.get('/api/temp',functions.temp);
    app.get('/api/peso',functions.peso);
    app.get('/api/humidity',functions.humidity);
    app.post('/api/test',functions.test);
    app.get('/api/inventory',functions.getInventory);
    app.post('/api/peso',functions.setPeso);
    app.get('/api/product',functions.getProduct);
    app.post('/api/product',functions.setProduct);
    app.post('/api/auth',functions.dispensar);
    app.post('/api/authaccess',functions.authAcess);
    app.post('/api/testar', functions.CreateUser)
    app.post('/api/tester', functions.deleteUser)

}