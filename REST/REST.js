var mysql = require("mysql");
function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {
    router.get("/",function(req,res){
        res.json({"Message" : "Hello World !"});
    })
    
    
    
    //products
    router.get("/products",function(req,res){
        var query = "SELECT * FROM products";
        connection.query(query,function(err,rows){
            res.json(rows);
        })
    })
    router.get("/products:id", function(req,res){
        var idvar = req.params.id;
        while(idvar.charAt(0) === ':')
            idvar = idvar.substr(1);
        var query = "SELECT * FROM products WHERE id = " + idvar;
        var tables = ['products','id', req.params.id];
        query = mysql.format(query,tables);
        console.log("get products by id:" + query);
        connection.query(query,function(err,rows){
            res.json(rows);
        });
    });
    router.put("/products", function(req,res){
        var query = "INSERT INTO products(name,barcode,idmanufacturer) VALUES (?,?,?);";
        var tables = [req.body.name,parseInt(req.body.barcode), parseInt(req.body.idman)];
        query = mysql.format(query,tables);
        console.log("put products: " + query);
        console.log(parseInt(req.body.barcode));
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Query" : "Failed"});
            } else {
                res.json({"Query" : "Complete"});
            };
        });
    });
    
    
    //manufacturer
    router.get("/manu",function(req,res){
        var query = "SELECT * FROM manufacturer";
        connection.query(query,function(err,rows){
            console.log("get manufacturer: " + query);
            res.json(rows);
        })
    })
    router.get("/manu:id", function(req,res){
        var idvar = req.params.id;
        while(idvar.charAt(0) === ':')
            idvar = idvar.substr(1);
        var query = "SELECT * FROM ?? WHERE ?? = ?";
        var tables = ['manufacturer','id', idvar];
        query = mysql.format(query,tables);
        console.log("get manu by id:" + query);
        connection.query(query,function(err,rows){
            res.json(rows);
        });
    });
    
    
    
    //address
    router.get("/address/country",function(req,res){
        var query = "SELECT * FROM Country";
        connection.query(query,function(err,rows){
            console.log("get countries: " + query);
            res.json(rows);
        })
    })
    router.get("/address/country:id", function(req,res){
        var idvar = req.params.id;
        while(idvar.charAt(0) === ':')
            idvar = idvar.substr(1);
        var query = "SELECT * FROM ?? WHERE ?? = ?";
        var tables = ['Country','id', idvar];
        query = mysql.format(query,tables);
        console.log("get country by id:" + query);
        connection.query(query,function(err,rows){
            res.json(rows);
        });
    });
} 

module.exports = REST_ROUTER;
