var express = require("express");
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var md5 = require('MD5');
var rest = require("./REST.js");
var app  = express();
var path = require("path");

function REST(){
    var self = this;
    self.connectMysql();
}

REST.prototype.connectMysql = function() {
    var self = this;
    var pool = mysql.createPool({
        connectionLimit : 100,
        user : 'root' ,
        host : 'localhost' ,
        password : 'idunno' ,
        database : 'madeIn' ,
        debug : false,
        multipleStatements: true
    });
    pool.getConnection(function(err,connection){
        if(err) {
            self.stop(err);
        } else {
            self.configureExpress(connection);
        }
    });
}

REST.prototype.configureExpress = function(connection) {
    var self = this;
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    var router = express.Router();
    app.use('/api', router);
    var rest_router = new rest(router,connection,md5);
    self.startServer();
}

REST.prototype.startServer = function() {
      app.listen(3000,function(){
          console.log("All right ! I am alive at Port 3000.");
      });
}

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL n" + err);
    process.exit(1);
}

app.get('/',function(req,res){
    res.sendFile(__dirname + '/public/index.html');
    console.log("I got a thingy");
});
app.get('/login',function(req,res){
    res.sendFile(__dirname + '/public/login.html');
    console.log("I got a thingy");
});
app.get('/profile',function(req,res){
    res.sendFile(__dirname + '/public/profile.html');
    console.log("I got a thingy");
});
new REST();
