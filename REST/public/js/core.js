// public/core.js

var geocoder= new google.maps.Geocoder();   
var address;
angular.module('madeIn', ['ngSanitize'])

    .controller('mainController', function($scope, $http) {
    $scope.barcode = '';
    console.log(readCookie("id_token"));
    if (readCookie("id_token")) {

      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open("GET", 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + readCookie("id_token"), false); // true for asynchronous 
      xmlHttp.send(null);
      eval('obj='+xmlHttp.responseText);
      $scope.login = "<a href='profile.html'>" + obj.name + "</a>";
    } else {
      $scope.login = '<a href="login.html"><span class="glyphicon glyphicon-log-in"></span> Login/Sign Up</a>'
    }
    console.log($scope.login);
    $scope.getProduct = function(barcode) {
        $http.get('/api/products:' + barcode)
            .success(function(data) {
	      if (data) {
		console.log("registered product");
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