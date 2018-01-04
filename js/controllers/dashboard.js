angular.module('MCM.dashboard', [])

.controller('DashboardCtrl', function($scope, $http, $q, UserServ, DataServ, GraphServ) {
    $scope.user = UserServ.user;

    DataServ.getData()
    .then(function(returnData) {
        $scope.data = returnData.myData;
    });

    
});
