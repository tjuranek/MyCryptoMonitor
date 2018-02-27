angular.module('MCM.settings', [])

.controller('SettingsCtrl', function($scope, $http, UserServ, DataServ) {      
    $scope.portfolio = UserServ.user.currencies;
    $scope.watchlist = UserServ.user.watchlist;

});