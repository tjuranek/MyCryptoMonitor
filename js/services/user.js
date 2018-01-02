angular.module('MCM.user', [])

.service('UserServ', function() {
    var user = {
        id: 0,
        name: "Thomas Juranek",
        email: "thomas@juranek.com",
        currencies: [{
            id: "raiblocks",
            amount: 15.26948665
        }, {
            id: "tron",
            amount: 2305.692
        }, {
            id: "bitcoin",
            amount: 0.0000855
        }, {
            id: "litecoin",
            amount: 2
        }],
        invested: 110.61
    }

    return {
        'user': user
    }
});