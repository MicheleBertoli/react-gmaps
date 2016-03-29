var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

var host = process.env.IP || '0.0.0.0',
  port = process.env.PORT || 3000;

var server = app.listen(port, host, function() {
  console.log('Listening at http://%s:%s', host, port);
});
