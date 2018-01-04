angular.module('MCM.dashboard', [])

.controller('DashboardCtrl', function($scope, $http, $q, UserServ, DataServ, GraphServ) {
    $scope.user = UserServ.user;

    DataServ.getData()
    .then(function(returnData) {
        $scope.data = returnData.myData;
        
        drawLineChart("BTC");
        drawDoughnutChart();
        generateDailyReport();
    });

    
    function drawLineChart(cryptoSym) {
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

                var ctx = document.getElementById("chartInvestmentValues").getContext('2d');
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

            for (var b = 0; b < $scope.data.marketData.length; b++) {
                if ($scope.data.marketData[b].id == searchTerm) {
                    graphLabels.push($scope.data.marketData[b].symbol);
                    graphData.push($scope.user.currencies[i].amount * $scope.data.marketData[b].price_usd);
                }
            }
        }

        var ctx = document.getElementById("chartInvestmentComposition").getContext('2d');
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
