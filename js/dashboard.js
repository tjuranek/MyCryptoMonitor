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
        drawChart("ARK");
    })
    .error(function() {
        alert("Something went wrong with CoinMarketCap's API! :(");
    })

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

    function drawChart(cryptoSym) {
        // GET HISTORICAL DATA FOR CYPTO
        var url = "https://min-api.cryptocompare.com/data/histoday?fsym=" + cryptoSym + "&tsym=USD&limit=6";

        $http.get(url)
        .success(function(data) {
            var graphLabel = cryptoSym;
            var graphDates = [];
            var graphData = [];

            for (i = 0; i < data.Data.length; i++) {
                var _date = new Date(data.Data[i].time * 1000);
                var _date = (_date.getMonth() + 1) + "/" + _date.getDate();
                graphDates.push(_date);

                var _data = data.Data[i].close;
                graphData.push(_data);
            }

            var ctx = document.getElementById("chartInvestmentTotals").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: graphDates,
                    datasets: [{
                        label: graphLabel,
                        data: graphData,
                        fill: false,
                        borderColor: 'rgba(30, 124, 225, 1)',
                        borderWidth: 3,
                        pointRadius: 0
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
        })
        .error(function() {
            alert("Something went wrong with CoinMarketCap's API! :(");
        })
    }
});
