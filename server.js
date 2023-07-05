var express = require('express');
var https = require('https');
var fs = require('fs');

const app = express(); 

var options = {
    key: fs.readFileSync('C:/sites/ssl/effyaws3.effyjewelry.com-key.pem'),
    cert: fs.readFileSync('C:/sites/ssl/effyaws3.effyjewelry.com-crt.pem')
};

const server = https.createServer(options, app);

server.listen(443, () => {
  console.log('Server running on port 443 with SSL');
});