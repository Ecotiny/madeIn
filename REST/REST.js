var mysql = require("mysql");
function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {
    router.get("/",function(req,res){
        res.json({"Message" : "Hello World !"});
    })
    
    
    
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //-------------------PRODUCTS---------------------
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    router.get("/products",function(req,res){
        var query = "SELECT * FROM products";
        connection.query(query,function(err,rows){
            res.json(rows);
        })
    });
    router.get("/products:barcode", function(req,res){
        var idvar = req.params.barcode;
        while(idvar.charAt(0) === ':')
            idvar = idvar.substr(1);
        var query = "SELECT * FROM products JOIN manufacturer ON products.idmanufacturer=manufacturer.manuid JOIN product_factory ON products.id=product_factory.idproduct JOIN factory ON factory.factoryid=product_factory.idfactory JOIN factory_address ON factory_address.idfactory=factory.factoryid JOIN address ON factory_address.idaddress=address.id JOIN countries ON address.country=countries.id JOIN states ON address.state = states.id JOIN city ON address.city = city.id WHERE products.barcode = " + parseInt(idvar);
        console.log("get products by barcode: " + query);
        connection.query(query,function(err,rows){
            res.json(rows);
        });
    });
    router.put("/products", function(req,res){
        var query = "INSERT INTO products(name,barcode,idmanufacturer) VALUES (?,?,?); INSERT INTO product_contributor (idproduct, iduser, contribution_type) VALUES";
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
    //contributions
    router.get("/contrib", function(req,res){
        var query = "SELECT * FROM contribution_type";
        console.log("get contrib");
        connection.query(query, function(err,rows){
            res.json(rows);
        })
    })
    router.put("/contrib", function(req,res){
        var query = "INSERT INTO contribution_type (contriname) VALUES (?)";
        var tables = [req.body.name];
        query = mysql.format(query, tables);
        console.log("put contrib: " + query);
        connection.query(query, function(err,rows){
            if (err) {
                res.json({"ERROR" : "YUP"});
            } else {
                res.json({"ERROR" : "nope"});
            }    
        })
    })
    
    
    //MANUFACTURER
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
        var query = "SELECT * FROM manufacturer JOIN countries ON manufacturer.idcountryman=countries.id WHERE manufacturer.manuid = ?";
        var tables = [parseInt(idvar)];
        query = mysql.format(query,tables);
        console.log("get manu by id: " + query);
        connection.query(query, function(err,result){
            res.json(result);
        });
    });
    router.put("/manu", function(req,res){
        var query = "INSERT INTO manufacturer (name, idcountryman) VALUES (?,?)";
        var tables = [req.body.name, parseInt(req.body.idcountryman)];
        query = mysql.format(query, tables);
        console.log(query);
        connection.query(query, function(err, result){
            if (err) {
                res.json({"Query" : "Failed"});
            } else {
                res.json({"Query" : "Successful"});
            }
        });
    });
    
    
    //ADDRESS
    router.get("/address/countryname:namecount", function(req,res){
        var idvar = req.params.namecount;
        while(idvar.charAt(0) === ':')
            idvar = idvar.substr(1);
        idvar = idvar.replace("_", " ");
        console.log(idvar);
        var query = "SELECT * FROM countries WHERE name = ?";
        var tables = [idvar];
        query = mysql.format(query, tables);
        connection.query(query, function(err,results){
            console.log("get country by name: ", query);
            res.json({"results" : results});
        })
    })
    router.get("/address/country",function(req,res){
        var query = "SELECT * FROM countries";
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
        var tables = ['countries','id', idvar];
        query = mysql.format(query,tables);
        console.log("get country by id:" + query);
        connection.query(query,function(err,rows){
            res.json(rows);
        });
    });
    router.get("/address/state",function(req,res){
        var query = "SELECT * FROM states";
        connection.query(query,function(err,rows){
            console.log("get state: " + query);
            res.json(rows);
        });
    });
    router.get("/address/state:id", function(req,res){
        var idvar = req.params.id;
        while(idvar.charAt(0) === ':')
            idvar = idvar.substr(1);
        var query = "SELECT states.id, states.statename, states.country_id, countries.name, countries.id FROM states JOIN countries ON states.country_id=countries.id WHERE states.id = ?";
        var tables = [parseInt(idvar)];
        query = mysql.format(query,tables);
        console.log("get state by id: " + query);
        connection.query(query, function(err,result){
            res.json(result);
        });
    });
    router.put("/address/state", function(req,res){
        var query = "INSERT INTO state(name, country_id) VALUES (?,?);";
        var tables = [req.body.name, req.body.country_id];
        query = mysql.format(query,tables);
        console.log("put state: " + query);
        console.log(parseInt(req.body.barcode));
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Query" : "Failed"});
            } else {
                res.json({"Query" : "Complete"});
            };
        });
    });
    router.get("/address/city",function(req,res){
        var query = "SELECT * FROM city";
        connection.query(query,function(err,rows){
            console.log("get city: " + query);
            console.log(rows);
            res.json(rows);
        });
    });
    router.get("/address/city:id", function(req,res){
        var idvar = req.params.id;
        while(idvar.charAt(0) === ':')
            idvar = idvar.substr(1);
        var query = "SELECT city.name, city.id, city.stateid, states.statename, states.country_id FROM city JOIN states ON city.stateid=states.id WHERE city.id = ?";
        var tables = [parseInt(idvar)];
        query = mysql.format(query,tables);
        console.log("get city by id:" + query);
        connection.query(query, function(err,result){
            res.json(result);
        });
    });
    router.put("/address/city", function(req,res){
        var query = "INSERT INTO city(name, stateid) VALUES (?,?);";
        var tables = [req.body.name, req.body.stateid];
        query = mysql.format(query,tables);
        console.log("put city: " + query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Query" : "Failed"});
            } else {
                res.json({"Query" : "Complete"});
            };
        });
    });
    //FACTORY
    router.get("/factories", function(req, res){
        var query = "SELECT * FROM factory";
        console.log("get all factories: " + query);
        connection.query(query, function(err, result){
            res.json(result);
        })
    })
    router.get("/factories:id", function(req,res){
        var idvar = req.params.id;
        while(idvar.charAt(0) === ':')
            idvar = idvar.substr(1);
        var query = "SELECT factory.factoryid, factory.factoryname, manufacturer.manuid, manufacturer.manufacturername, manufacturer.idcountryman, address.street, address.city, address.state, address.country, address.zip FROM factory                                                          JOIN manufacturer_factory ON factory.factoryid=manufacturer_factory.idfactory                                                                      JOIN manufacturer ON manufacturer_factory.idmanufacturer=manufacturer.manuid                                                                        JOIN factory_address ON factory.factoryid=factory_address.idfactory JOIN address ON factory_address.idaddress=address.id                               WHERE factory.factoryid = " + idvar;
        console.log(query);
        connection.query(query, function(err, rows){
            res.json(rows);
        })
    });
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //---------------------USER-----------------------
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    router.get("/user", function(req, res){
        var query = "SELECT * FROM users";
        console.log("get users: " + query);
        connection.query(query, function(err,rows){
            res.json(rows);
        })
    })
    router.put("/user", function(req, res){
        var query = "INSERT INTO users (usersname, email, passwd) VALUES (?,?,?)";
        var tables = [req.body.username, req.body.email, md5(req.body.password)];
        query = mysql.format(query, tables);
        console.log("put users" + query);
        connection.query(query, function(err, rows){
            if (err) {
                console.log("ERROR");
                res.json({"error" : "YEP"});
            } else {
                console.log("NO ERROR");
                res.json({"error" : "Nope"});
            }
        });
    })
    router.post("/tokensignin", function(req, res){
	var GoogleAuth = require('google-auth-library');
	var img2ascii = require("asciify-image");
	var auth = new GoogleAuth;
	var client = new auth.OAuth2("291473215081-56gt0ug8jsqqq942r7p2dgak4jhjt1q5.apps.googleusercontent.com", '', '');
	client.verifyIdToken(
	    req.body.idtoken,
	    "291473215081-56gt0ug8jsqqq942r7p2dgak4jhjt1q5.apps.googleusercontent.com",
	    // Or, if multiple clients access the backend:
	    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3],
	    function(e, login) {
	      var payload = login.getPayload();
	      var userid = payload['sub'];
	      console.log("userid: " + userid);
	      console.log("name: " + payload['name']);
	      img2ascii(payload['picture'], function (err, result) {
		  console.log(result);
	      })
	      // If request specified a G Suite domain:
	      //var domain = payload['hd'];
	      
	    });
    })
} 

module.exports = REST_ROUTER;
