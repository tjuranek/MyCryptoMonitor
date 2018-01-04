angular.module('MCM.data', [])

.service('DataServ', function($http, $q, UserServ) {
    var myData;
    var marketData;
    var investmentData = [];

    var totalInvested = 0;
    var totalValue = 0;
    var totalProfit = 0;

    var getData = function() {
        console.log("just ran getData in the service");

        return $http.get("https://api.coinmarketcap.com/v1/ticker/?limit=0")
            .then(function(data) {
                marketData = data.data;
                calcInvestmentData();
                
                return {
                    myData
                }
            });
    }

    function calcInvestmentData() {
        var user = UserServ.user;
        var exactValue = 0;

        for (var a = 0; a < user.currencies.length; a++) {
            var searchTerm = user.currencies[a].id;

            for (var b = 0; b < marketData.length; b++) {
                if (marketData[b].id == searchTerm) {
                    investmentData.push(marketData[b]);
                    exactValue += user.currencies[a].amount * marketData[b].price_usd;
                }
            }
        }

        totalInvested = user.invested;

        totalValue = Math.round(exactValue * 100) / 100;
        totalValue = totalValue.toLocaleString();

        totalProfit = Math.round((exactValue - totalInvested) * 100) / 100;
        totalProfit = totalProfit.toLocaleString();

        myData = {
            marketData: marketData,
            investmentData: investmentData,
            totalInvested: totalInvested,
            totalValue: totalValue,
            totalProfit: totalProfit
        }
    }

    return {
        'getData': getData
    }
});