angular.module('MCM.data', [])

.service('DataServ', function($http, UserServ) {
    var marketData;
    var investmentData = [];

    var totalInvested;
    var totalValue;
    var totalProfit;

    $http.get("https://api.coinmarketcap.com/v1/ticker/")
        .success(function(data) {
            calcInvestmentData(data);
        })
        .error(function() {
            alert("Error: Unable to attain data from coinmarketcap.com.");
        })

    //console.log("out of call");
    //console.log(marketData);

    function calcInvestmentData(cmcData) {
        var user = UserServ.user;
        //marketData = cmcData;
        console.log(cmcData);

        var exactValue;

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
    }

    var data = {
        marketData: marketData,
        investmentData: investmentData,
        totalInvested: totalInvested,
        totalValue: totalValue,
        totalProfit: totalProfit
    }

    return {
        'data': data
    }
});