angular.module('MCM.reports', [])

.controller('ReportsCtrl', function($scope, $http, UserServ, DataServ) {      
    $scope.user = UserServ.user;

    DataServ.getData()
    .then(function(returnData) {
        $scope.data = returnData.myData;

        generateDailyReport();
    });

    function generateDailyReport() {
        var today = new Date();
        $scope.date =  (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
    }
});