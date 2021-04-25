const customInterpolationApp = angular.module('customInterpolationApp', []);
const url = 'https://localhost:8888/test';

customInterpolationApp.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

customInterpolationApp.controller('DemoController', ['$http', function ($scope) {
    $scope.label = "This binding is brought you by [[]] interpolation symbols.";

    //
    // $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
    // then(function(response) {
    //     $scope.status = response.status;
    //     $scope.data = response.data;
    //
    //     $scope.vorname = res[0].name;
    //     $scope.nachname = res[0].surname;
    // }, function(response) {
    //     $scope.data = response.data || 'Request failed';
    //     $scope.status = response.status;
    // });
    //
    // fetch(url)
    //     .then(function(res) {
    //         return res.json();
    //     })
    //     .then(function(res) {
    //         console.log(res[0].name);
    //
    //     })
    //     .catch(function(err) {
    //         console.error(err);
    //     });
}]);
