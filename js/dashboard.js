var app = angular.module("MyCryptoMonitor", []);

app.controller("DashboardCtrl", function($scope, $http) {
    // TEST USER
    $scope.user = {
        id: 0,
        name: "Thomas Juranek",
        email: "thomas@juranek.com",
        currencies: [{
            id: "bitcoin",
            amount: .3
        }, {
            id: "ethereum",
            amount: 4
        }, {
            id: "litecoin",
            amount: 6.9
        }, {
            id: "stratis",
            amount: 200
        }, {

            id: "raiblocks",
            amount: 700
        }, {
            id: "ripple",
            amount: 2800
        }],
        invested: 510.61
    }

    // COINMARKETCAP TOTAL MARKET API CALL
    $http.get("https://api.coinmarketcap.com/v1/ticker/")
        .success(function(data) {
            $scope.marketData = data;
            calcInvestmentTotals();
            drawChart("LTC");
            drawDoughnutChart();
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

    function drawChart(cryptoSym) {
        // GET HISTORICAL DATA FOR CYPTO
        var url = "https://min-api.cryptocompare.com/data/histoday?fsym=" + cryptoSym + "&tsym=USD&limit=30";

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
                                    beginAtZero: true
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

    function generateColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    }
});
