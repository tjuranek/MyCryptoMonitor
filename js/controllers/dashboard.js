angular.module('MCM.dashboard', [])

.controller('DashboardCtrl', function($scope, $http, UserServ, DataServ, GraphServ) {
    $scope.user = UserServ.user;
    $scope.data = DataServ.data;

    //console.log($scope.data.totalInvested);
    console.log($scope.data)
});
