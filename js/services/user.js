angular.module('MCM.user', [])

.service('UserServ', function() {
    var user = {
        id: 0,
        name: "Thomas Juranek",
        email: "thomas@juranek.com",
        currencies: [{
            id: "raiblocks",
            amount: 5
        }, {
            id: "walton",
            amount: 17.982
        }, {
            id: "stellar",
            amount: 318.202
        }, {
            id: "litecoin",
            amount: 1.02314494
        }, {
            id: "wabi",
            amount: 69
        }],
        invested: 1000.00
    }

    return {
        'user': user
    }
});