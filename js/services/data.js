angular.module('MCM.data', [])

.service('DataServ', function($http, $q, UserServ) {
    var myData;
    var marketData;
    var investmentData = [];
    var watchlistData = [];

    var totalInvested = 0;
    var totalValue = 0;
    var totalProfit = 0;

    var getData = function() {
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
                    marketData[b].portfolio_value_usd = user.currencies[a].amount * marketData[b].price_usd;
                    marketData[b].currencies_notes = user.currencies[a].notes;
                    marketData[b].amount = user.currencies[a].amount;

                    investmentData.push(marketData[b]);
                    exactValue += user.currencies[a].amount * marketData[b].price_usd;
                }
            }
        }

        for (var z = 0; z < user.watchlist.length; z++) {
            var searchTerm = user.watchlist[z].id;

            for (var y = 0; y < marketData.length; y++) {
                if (marketData[y].id == searchTerm) {
                    marketData[y].watchlist_notes = user.watchlist[z].notes;
                    watchlistData.push(marketData[y]);
                }
            }
        }

        investmentData.sort(function(a, b){return a.rank - b.rank});
        watchlistData.sort(function(a, b){return a.rank - b.rank});

        totalInvested = user.invested;

        totalValue = Math.round(exactValue * 100) / 100;
        totalValue = totalValue.toLocaleString();

        totalProfit = Math.round((exactValue - totalInvested) * 100) / 100;
        totalProfit = totalProfit.toLocaleString();

        myData = {
            marketData: marketData,
            investmentData: investmentData,
            watchlistData: watchlistData,
            totalInvested: totalInvested,
            totalValue: totalValue,
            totalProfit: totalProfit
        }
    }

    return {
        'getData': getData
    }
});