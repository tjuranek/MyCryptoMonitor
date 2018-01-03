angular.module('MCM.dashboard', [])

.controller('DashboardCtrl', function($scope, $http, $q, UserServ, DataServ, GraphServ) {
    $scope.user = UserServ.user;

    var myData = DataServ.getData();
    myData.then(function(result) {
        $scope.data = result;
    })
    $scope.data = DataServ.getData().then(function() {
    });

    DataServ.getData()
        .then(function(data) {
            $scope.data = 
        })

    console.log("User: " + $scope.user.name);
    console.log("Data: " + $scope.data);
    console.log($scope.data);
    /*

    DataServ.data.then(function(data) {
        $scope.data = data;
        console.log($scope.data);
    });

    console.log($scope.data);

    /*
    var servData = DataServ.getData();
    servData.then(function(result) {
        $scope.data = result;
        console.log($scope.data);
    });
    */

    //console.log($scope.data.totalInvested);
    //console.log($scope.data);
});
