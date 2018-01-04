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
            id: "cardano",
            amount: 217.68
        }],
        invested: 510.61
    }

    return {
        'user': user
    }
});