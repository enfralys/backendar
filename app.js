var express = require('express');
var app = express();
const mid = require('./src/middleware/dorotiMiddleware')
var jwt=require('jsonwebtoken');
var expressJwt=require('express-jwt');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }))
var jwtClave="laclave_de_cecilio";



app.use(expressJwt({secret:jwtClave}).unless({path: ["/api/login"]}));

app.use(mid.max_request);
require('./src/routes/doroti')(app);

  
app.post("/api/login",function(request,response) {
   var token=jwt.sign({
   usuario:"ekia"
   },jwtClave);
   response.send(token);
  });




app.listen(3000, function () {
  console.log('Example app listening on port 3000!');

});
