// public/core.js
    
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
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

});