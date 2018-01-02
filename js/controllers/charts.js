angular.module('MCM.charts', [])

.controller('ChartsCtrl', function($scope, $http) {      
    drawChart("BTC");

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
});

