// public/core.js
    
angular.module('madeIn', [])

    .controller('mainController', function($scope, $http) {
    $scope.barcode = {};
    $scope.getProduct = function(barcode) {
        $http.get('/api/products:' + barcode)
            .success(function(data) {
                $scope.productname = data[0].name;
                console.log(data[0].name);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

});