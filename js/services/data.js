angular.module('MCM.data', [])

.service('DataFac', function(UserServ) {
    var marketData;
    var investmentData;

    $http.get("https://api.coinmarketcap.com/v1/ticker/")
        .success(function(data) {
            marketData = data;

            calcInvestmentData();
        })
        .error(function() {
            alert("Error: Unable to attain data from coinmarketcap.com.");
        })

    function calcInvestmentData() {
        var user = UserServ.user;

        for (var a = 0; a < user.currencies.length; a++) {
            var searchTerm = user.currencies[a].id;

            for (var b = 0; b < marketData.length; b++) {
                if (marketData[b].id == searchTerm) {
                    investmentData.push(marketData[b]);
                }
            }
        }

    }


function findUserCurrencyData() {
    $scope.userCurrencyData = [];

    // CALCULATE EXACT AND DISPLAY VALUES
    for (var a = 0; a < $scope.user.currencies.length; a++) {
        var searchTerm = $scope.user.currencies[a].id;
        for (var b = 0; b < $scope.marketData.length; b++) {
            if ($scope.marketData[b].id == searchTerm) {
                $scope.userCurrencyData.push($scope.marketData[b]);
            }
        }
    }
}

function calcInvestmentTotals() {
    $scope.exactValue = 0;
    $scope.totalInvested = $scope.user.invested;
    $scope.totalProfit = 0;

    // CALCULATE EXACT AND DISPLAY VALUES
    for (var a = 0; a < $scope.user.currencies.length; a++) {
        var searchTerm = $scope.user.currencies[a].id;
        for (var b = 0; b < $scope.marketData.length; b++) {
            if ($scope.marketData[b].id == searchTerm) {
                $scope.exactValue += $scope.user.currencies[a].amount * $scope.marketData[b].price_usd;
            }
        }
    }
    $scope.totalValue = Math.round($scope.exactValue * 100) / 100;
    $scope.totalValue = $scope.totalValue.toLocaleString();

    // CALCULATE TOTAL PROFIT
    $scope.totalProfit = $scope.exactValue - $scope.totalInvested;
    $scope.totalProfit = Math.round($scope.totalProfit * 100) / 100;
    $scope.totalProfit = $scope.totalProfit.toLocaleString();
}
});