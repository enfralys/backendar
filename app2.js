const express = require('express')
const app = express();
// Declare a route
app.use('/resources',express.static(__dirname + '/resources'));
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });