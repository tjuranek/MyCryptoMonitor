angular.module('MCM.dashboard', [])

.controller('DashboardCtrl', function($scope, $http) {
    // TEST USER
    $scope.user = {
        id: 0,
        name: "Thomas Juranek",
        email: "thomas@juranek.com",
        currencies: [{
            id: "litecoin",
            amount: 2
        }, {
            id: "iota",
            amount: 40.214
        }, {
            id: "raiblocks",
            amount: 6.702
        }, {
            id: "ripple",
            amount: 53.76
        }],
        invested: 650.78
    }

    // COINMARKETCAP TOTAL MARKET API CALL
    $http.get("https://api.coinmarketcap.com/v1/ticker/")
        .success(function(data) {
            $scope.marketData = data;

            findUserCurrencyData();
            calcInvestmentTotals();
            drawDoughnutChart();
            generateDailyReport();
        })
        .error(function() {
            alert("Something went wrong with CoinMarketCap's API! :(");
        })

    
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

    function drawDoughnutChart() {
        var graphColors = ["#F05D0D", "#41B8A4", "#A1C339", "#31BC59", "#BCBCBE", "#E8070D"];
        var graphData = [];
        var graphLabels = [];

        for (var i = 0; i < $scope.user.currencies.length; i++) {
            var searchTerm = $scope.user.currencies[i].id;

            for (var b = 0; b < $scope.marketData.length; b++) {
                if ($scope.marketData[b].id == searchTerm) {
                    graphLabels.push($scope.marketData[b].symbol)
                    graphData.push($scope.user.currencies[i].amount * $scope.marketData[b].price_usd);
                }
            }
        }

        var ctx = document.getElementById("chartInvestmentPercentages").getContext('2d');
        var myDoughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: graphData,
                    backgroundColor: graphColors
                }],
                labels: graphLabels
            },
            options: {
                legend: {
                    position: 'bottom'
                }
            }
        });
    }

    function generateDailyReport() {
        var today = new Date();
        $scope.date =  (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
    }
});
