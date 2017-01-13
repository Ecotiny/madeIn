// public/core.js
    
angular.module('madeIn', [])

    .controller('mainController', function($scope, $http) {
    $scope.barcode = {};
    $scope.getProduct = function(barcode) {
        $http.get('/api/products:' + barcode)
            .success(function(data) {
                $scope.name = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

});