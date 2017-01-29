// public/core.js
var loggedin;
var geocoder= new google.maps.Geocoder();   
var address;
// <li class="dropdown"> <a href="#" class="dropdown-toggle" data-toggle="dropdown"><b>Login</b> <span class="caret"></span></a> <ul id="login-dp" class="dropdown-menu"> <li> <div class="row"> <div class="col-md-12"> Login via <div class="social-buttons"> <div class="g-signin2" data-onsuccess="onSignIn" data-prompt="select_account" data-theme="dark"></div> <a href="#" class="btn btn-tw"><i class="fa fa-twitter"></i> Twitter</a> </div> or <form class="form" role="form" method="post" action="login" accept-charset="UTF-8" id="login-nav"> <div class="form-group"> <label class="sr-only" for="exampleInputEmail2">Email address</label> <input type="email" class="form-control" id="exampleInputEmail2" placeholder="Email address" required> </div> <div class="form-group"> <label class="sr-only" for="exampleInputPassword2">Password</label> <input type="password" class="form-control" id="exampleInputPassword2" placeholder="Password" required> <div class="help-block text-right"><a href="">Forget the password ?</a></div> </div> <div class="form-group"> <button type="submit" class="btn btn-primary btn-block">Sign in</button> </div> <div class="checkbox"> <label> <input type="checkbox"> keep me logged-in </label> </div> </form> </div> <div class="bottom text-center"> New here ? <a href="#"><b>Join Us</b></a> </div> </div> </li> </ul> </li>
angular.module('madeIn', ['ngSanitize'])

    .controller('mainController', function($sce, $scope, $http) {
    $scope.barcode = '';
    if (readCookie("id_token")) {

      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open("GET", 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + readCookie("id_token"), false); // true for asynchronous 
      xmlHttp.send(null);
      eval('obj='+xmlHttp.responseText);
      $scope.notSigned = true;
      loggedin = 1;
      $scope.login = "<a href='profile'>" + obj.name + "</a>";
    } else {
        loggedin = 0;
    }
    console.log($scope.login);
    $scope.getProduct = function(barcode) {
        $http.get('/api/products:' + barcode)
            .success(function(data) {
	      if (typeof data[0] != "undefined") {
		console.log("registered product");
                $scope.name =
                $scope.miles = 
                $
                $scope.productname = data[0].productname;
                $scope.factoryCount = data[0].countryname;
                $scope.manuname = data[0].manufacturername;
                $scope.factoryCity = data[0].cityname;
                $scope.factoryState = data[0].statename;
                $scope.factoryStreet = data[0].street;
                $scope.distance = "Loading...";
                $scope.search=true;
		if (typeof $scope.factoryStreet === "undefined") {
		  $scope.factoryStreet = "";
		}
		if (typeof $scope.factoryCity === "undefined") {
		  $scope.factoryCity = "";
		}
		if (typeof $scope.factoryState === "undefined") {
		  $scope.factoryState = "";
		}
		if (typeof $scope.factoryCount === "undefined") {
		  $scope.factoryCount = "";
		}
                address = $scope.factoryStreet+","+$scope.factoryCity+","+$scope.factoryState+","+ $scope.factoryCount;
		console.log(address);
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        geocoder.geocode({'address': address}, function(results, status) {
                        if (status === 'OK') {
                            lat = results[0].geometry.location.lat();
                            lng = results[0].geometry.location.lng();
                            $scope.$apply(function(){
                                $scope.distance = parseInt(distance(lat,lng, position.coords.latitude, position.coords.longitude)) + " km";
                            });           
                        } else {
                            alert('Geocode was not successful for the following reason: ' + status);
                        }
                        });
                    });
                } else { 
                    console.log("Geolocation is not supported by this browser.");
		    $scope.$apply(function(){
		      $scope.distance = "Your browser does not support geolocation";
                    });
                }
	      } else {
		console.log("unregistered product");
		alert("UNREGISTERED");
                
	      }
                
            })
            .error(function(data) {
                console.log('Error: ' + data);
            }
	);
    };
    $scope.closeResults = function() {
	$scope.search = false;
    };
});
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}
function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/api/tokensignin');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('idtoken=' + id_token);
    if (xhr.responseText['Registered'] === true) {
        console.log("This user has been registered");
        createCookie("id_token", id_token)
        if (loggedin === 0) {
            window.location="http://localhost:3000";
            loggedin === 1;
        }
    } else if (xhr.responseText.length === 0) {
        console.log("Authenticated");
        createCookie("id_token", id_token);
        if (loggedin === 0) {
            window.location="http://localhost:3000";
            loggedin === 1;
        }
    } else {
        alert("Error in authentication");
    }
};
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        eraseCookie("id_token");
        console.log('User signed out.');
    });
}
function distance(lat1, lon1, lat2, lon2) {
  var deg2rad = 0.017453292519943295; // === Math.PI / 180
  var cos = Math.cos;
  lat1 *= deg2rad;
  lon1 *= deg2rad;
  lat2 *= deg2rad;
  lon2 *= deg2rad;
  var a = (
    (1 - cos(lat2 - lat1)) +
    (1 - cos(lon2 - lon1)) * cos(lat1) * cos(lat2)
  ) / 2;
  return 12742 * Math.asin(Math.sqrt(a)); // Diameter of the earth in km (2 * 6371)
}
