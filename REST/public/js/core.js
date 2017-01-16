// public/core.js
var geocoder = new google.maps.Geocoder();   
var address;
angular.module('madeIn', [])

    .controller('mainController', function($scope, $http) {
    $scope.barcode = '';
    $scope.getProduct = function(barcode) {
        $http.get('/api/products:' + barcode)
            .success(function(data) {
                $scope.productname = data[0].productname;
                $scope.factoryCount = data[0].countryname;
                $scope.manuname = data[0].manufacturername;
                $scope.factoryCity = data[0].cityname;
                $scope.factoryState = data[0].statename;
                $scope.factoryStreet = data[0].street;
                $scope.distance = "Loading...";
                console.log(data);
                $scope.search=true;
                address = $scope.factoryStreet+","+$scope.factoryCity+","+$scope.factoryState;
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        console.log(address);
                        geocoder.geocode({'address': address}, function(results, status) {
                        if (status === 'OK') {
                            lat = results[0].geometry.location.lat();
                            lng = results[0].geometry.location.lng();
			    console.log(position.coords.latitude);
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
                }
                
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
});
    

function distance(lat1, lon1, lat2, lon2) {
    console.log(lat1,lon1,lat2,lon2);
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
function showPosition(position, $scope) {
    console.log(address);
    geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng();
        $scope.distance = distance(lat,lng, position.coords.latitude, position.coords.longitude);
    } else {
        alert('Geocode was not successful for the following reason: ' + status);
    }
    });
}