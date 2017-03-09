var express = require('express');
var app = express();

app.use(express.static(__dirname + '/demo'));

var host = process.env.IP || '0.0.0.0',
  port = process.env.PORT || 3003;

var server = app.listen(port, host, function() {
  console.log('Listening at http://%s:%s', host, port);
});
