const customInterpolationApp = angular.module('customInterpolationApp', []);
const url = 'https://localhost:8888/test';

customInterpolationApp.config($interpolateProvider => {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

customInterpolationApp.factory('_cart', () => {
    const items = [ {id: 1, name: 'Pizza Free', price: 7}];

    return {
        getItems: () => {
            return items;
        },
        addArticle: (article) => {
            items.push(article);
            console.log(items);
        },
        sum: () => {
            return items.reduce((total, article) => {
                return total + article.price;
            }, 0);
        }
    };
});

customInterpolationApp.controller('DemoCtl', ($scope, $http, _cart) => {
    $scope.cart = _cart;
    $scope.label = "This binding is brought you by [[]] interpolation symbols.";
    $scope.vorname = "Thomas";
    $scope.nachname = "Schulte";
    $scope.pizzas = [
        {id: 1, name: 'Pizza Dutchman', price: 5},
        {id: 2, name: "Pizza Hot Salami", price: 5.5},
        {id: 3, name: "Pizza Vegan", price: 6},
        {id: 4, name: "Pizza Vegetaria", price: 5},
        {id: 5, name: "Pizza Salami", price: 5.5},
        {id: 6, name: "Pizza Thunfisch", price: 6}
    ];

    $http.get('https://localhost:8888/test')
        .then((articlesResponse) => {
            $scope.articles = articlesResponse.data;
            console.log(_cart.getItems());
        })
        .catch(e => {
            console.error(e);
            alert(e);
        });
});


