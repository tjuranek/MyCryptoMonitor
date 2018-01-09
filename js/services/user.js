angular.module('MCM.user', [])

.service('UserServ', function() {
    var user = {
        id: 0,
        name: "Thomas Juranek",
        email: "thomas@juranek.com",
        currencies: [{
            id: "raiblocks",
            amount: 5,
            notes: "Bought: .00057689 | Target: .001574957"
        }, {
            id: "walton",
            amount: 17.982,
            notes: "Bought: .00057689 | Target: .001574957"
        }, {
            id: "nuls",
            amount: 28.971,
            notes: "Bought: .00057689 | Target: .001574957"
        }, {
            id: "litecoin",
            amount: 1.02314494,
            notes: "Bought: .00057689 | Target: .001574957"
        }, {
            id: "wabi",
            amount: 69,
            notes: "Bought: .00057689 | Target: .001574957"
        }],
        watchlist: [{
            id: "ethereum",
            notes: "Notes on why you'd buy this crypto"
        }, {
            id: "bitcoin",
            notes: "Notes on why you'd buy this crypto"
        }, {
            id: "kyber-network",
            notes: "dj shill"
        }, {
            id: "stellar",
            notes: "previous owned"
        }],
        invested: 1000.00
    }

    return {
        'user': user
    }
});