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
            id: "stellar",
            amount: 318.202,
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
        invested: 1000.00
    }

    return {
        'user': user
    }
});