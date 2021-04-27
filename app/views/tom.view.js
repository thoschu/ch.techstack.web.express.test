const Handlebars = require('handlebars');

const source = `
    <!doctype html>
    <html class="no-js" lang="de">
        <head>
          <meta charset="utf-8">
          <title>{{name}}</title>
          <meta name="description" content="">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta property="og:title" content="">
          <meta property="og:type" content="">
          <meta property="og:url" content="">
          <meta property="og:image" content="">
          <meta name="theme-color" content="#fafafa">
          <link rel="manifest" href="site.webmanifest">
          <link rel="icon" href="https://www.thomas-schulte.de/html/images/favicon.ico">
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js" integrity="sha512-3n19xznO0ubPpSwYCRRBgHh63DrV+bdZfHK52b1esvId4GsfwStQNPJFjeQos2h3JwCmZl0/LgLxSKMAI55hgw==" crossorigin="anonymous"></script>
          <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
          <script src="js/app.js"></script>
        </head>
        <body ng-app="customInterpolationApp">
            <div class="container" ng-controller="DemoCtl">
                <div class="row">
                    <div class="col-sm">
                        <p>Hello world! This is the {{name}} Boilerplate...</p>
                        <p>Greetings from {{hometown}}</p>
                    </div>
                    <div class="col-sm">
                        <a href="/test/delete/13">DELETE 13</a>
                        <br>
                        <a href="/test/delete/1977">DELETE 77</a>
                        <br>
                        <a href="/test/delete">DELETE 0</a>
                    </div>
                    <div class="col-sm" >
                        <p>My first expression: [[ 5 + 5 ]]</p>
                        <p>[[label]]</p>
                        <p>[[vorname]] [[nachname]]</p>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-sm" data-ng-init="allName='Tom S.'">
                        <p>The name is: <span data-ng-bind="allName"></span></p>
                        <p>Input something in the input box:</p>
                        <p>Input : <input type="text" ng-model="name" placeholder="Enter name here"></p>
                        <h1>[[name.toLowerCase()]]</h1>
                        <h2>[[name.toUpperCase()]]</h2>
                        <h3 ng-show="name">Original: [[name]]</h3>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-sm">
                        <table class="table">
                            <tr ng-repeat="article in pizzas | filter:name">
                                <td ng-click="cart.addArticle(article)">[[article.name]]</td>
                            </tr>
                        </table>
                    <div>
                    <div class="col-sm">
                        <table class="table">
                            <tr ng-repeat="article in articles">
                                <td>[[article.name]]</td>
                                <td>[[article.surname]]</td>
                            </tr>
                        </table>
                    <div>
                </div>
            </div>
          <script>
              fetch(url)
                .then(function(res) {
                    return res.json();
                })
                .then(function(res) {
                    console.log(res[0].name);
                })
                .catch(function(err) {
                    console.error(err);
                });
          </script>
        </body>
    </html>
`;

const template = Handlebars.compile(source);

module.exports = function(data) {
    return template(data);
};
