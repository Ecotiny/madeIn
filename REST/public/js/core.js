// public/core.js
var geocoder = new google.maps.Geocoder();   
angular.module('madeIn', [])

    .controller('mainController', function($scope, $http) {
    $scope.barcode = {};
    $scope.getProduct = function(barcode) {
        $http.get('/api/products:' + barcode)
            .success(function(data) {
                $scope.productname = data[0].productname;
                $scope.distance = "Unknown";
                $scope.factoryCount = data[0].countryname;
                $scope.manuname = data[0].manufacturername;
                $scope.factoryCity = data[0].cityname;
                $scope.factoryState = data[0].statename;
                $scope.factoryStreet = data[0].street;
                console.log(data);
                $scope.search=true;
                var address = $scope.factoryStreet+","+$scope.factoryCity+","+$scope.factoryState;
                console.log(address);
                geocoder.geocode({'address': address}, function(results, status) {
                if (status === 'OK') {
                    lat = results[0].geometry.location.lat();
                    lng = results[0].geometry.location.lng();
                    console.log(lat);
//                     console.log(parseResults.geometry.viewport.b.b);
//                     console.log(parseResults.geometry.viewport.f.b);
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
                });
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
});