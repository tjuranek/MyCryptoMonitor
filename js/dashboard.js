var app = angular.module("MyCryptoMonitor", []);

app.controller("DashboardCtrl", function($scope, $http) {
    // TEST USER
    $scope.user = {
        id: 0,
        name: "Ecky Yakov",
        email: "imanerd@email.com",
        currencies: [{
            id: "bitcoin",
            amount: 1
        }, {
            id: "ethereum",
            amount: 1
        }, {
            id: "litecoin",
            amount: 1
        }],
        invested: 5025.05
    }

    // COINMARKETCAP TOTAL MARKET API CALL
    $http.get("https://api.coinmarketcap.com/v1/ticker/")
    .success(function(data) {
        $scope.marketData = data;
        calcInvestmentTotals();
        //drawInvestmentChart();
    })
    .error(function() {
        alert("Something went wrong with CoinMarketCap's API! :(");
    })

    function calcInvestmentTotals() {
        //console.log("here!@");
        $scope.exactValue = 0;
        $scope.totalInvested = $scope.user.invested;
        $scope.totalProfit = 0;

        // CALCULATE EXACT AND DISPLAY VALUES
        for (var a = 0; a < $scope.user.currencies.length; a++) {
            var searchTerm = $scope.user.currencies[a].id;
            for (var b = 0; b < $scope.marketData.length; b++) {
                if ($scope.marketData[b].id == searchTerm) {
                    $scope.exactValue += $scope.user.currencies[a].amount * $scope.marketData[b].price_usd;
                    console.log($scope.exactValue);
                }
            }
        }
        $scope.totalValue = Math.round($scope.exactValue * 100) / 100;
        $scope.totalValue = $scope.totalValue.toLocaleString();

        // CALCULATE TOTAL PROFIT
        $scope.totalProfit = $scope.exactValue - $scope.totalInvested;
        $scope.totalProfit = Math.round($scope.totalProfit * 100) /100;
        $scope.totalProfit = $scope.totalProfit.toLocaleString();
    }

    function drawInvestmentChart() {
        console.log("madeithere");
        var ctx = document.getElementById("MainChartYee").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    }
});
