
var fs = require('fs');
var express = require('express');
var http = require('http');
var https = require('https');
var config = require('./config.json');
var app = express();
var httpServer = http.createServer(app);
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/* Configuration */
// app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
const PORT = process.env.PORT || 3008;
app.set('port', PORT);

/* Start server */

if (config.use_ssl) {
  app.set('https_port', config.ssl_option.listenPort);
  var privateKey = fs.readFileSync(config.ssl_option.privateKey, 'utf8');
  var certificate = fs.readFileSync(config.ssl_option.certificate, 'utf8');
  var credentials = { key: privateKey, cert: certificate };
  var httpsServer = https.createServer(credentials, app);
  httpsServer.listen(app.get('https_port'), function () {
    console.log('Express server listening on port %d in %s mode', app.get('https_port'), app.get('env'));
  });
} else {
  httpServer.listen(app.get('port'), function () {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
  });
}

app.get('/*', function (req, res) {
  var param = req.url.split('/');
  if (param) {
    switch (param[1]) {
      case 'login':
        res.sendFile(__dirname + '/public/login.html', function (err) {
          if (err) {
            res.status(500).send(err)
          }
        });
        break;

      case 'admin':
        res.sendFile(__dirname + '/public/loginAdmin.html', function (err) {
          if (err) {
            res.status(500).send(err)
          }
        });
        break;
      case 'forgot-password':
        res.sendFile(__dirname + '/public/forgotpassword.html', function (err) {
          if (err) {
            res.status(500).send(err)
          }
        });
        break;

      case 'reset-password':
        res.sendFile(__dirname + '/public/resetpassword.html', function (err) {
          if (err) {
            res.status(500).send(err)
          }
        });
        break;

      case 'minisite':
        res.sendFile(__dirname + '/public/minisite.html', function (err) {
          if (err) {
            res.status(500).send(err)
          }
        });
        break;
      case 'management':
        res.sendFile(__dirname + '/public/management.html', function (err) {
          if (err) {
            res.status(500).send(err)
          }
        });
        break;
      default:
        res.sendFile(__dirname + '/public/index.html', function (err) {
          if (err) {
            res.status(500).send(err)
          }
        });
        break;
    }
  } else {
    fs.readFile(__dirname + '/public/login.html', 'utf8', function (err, data) {
      if (err) {
        return;
      }
      res.send(data);
    });
  }

})
module.exports = app;