angular.module('MCM.marketrundown', [])

.controller('MarketRundownCtrl', function($scope, $http, UserServ, DataServ) {      
    $scope.user = UserServ.user;

    DataServ.getData()
    .then(function(returnData) {
        $scope.data = returnData.myData;
        console.log($scope.data);
    });
});

