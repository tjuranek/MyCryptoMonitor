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
            amount: 0.00931
        }],
        invested: 510.61
    }

    return {
        'user': user
    }
});