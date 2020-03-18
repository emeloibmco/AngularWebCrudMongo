
const appName = require('./../package').name;
const http = require('http');
const express = require('express');
const localConfig = require('./config/local.json');
const morgan = require('morgan');
const cors = require('cors');


const app = express();
const router = require('./routers/index');
const conection = require('./conection/mongo');
conection(app);
router(app);

//app.use(morgan());
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




const server = http.createServer(app);
const port = process.env.PORT || localConfig.port;
server.listen(port, function(){
  
});

module.exports = server;