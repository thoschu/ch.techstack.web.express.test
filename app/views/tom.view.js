const Handlebars = require('handlebars');

const source = `
    <!doctype html>
    <html class="no-js" lang="">
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
          <!-- Place favicon.ico in the root directory -->
<!--          <link rel="stylesheet" href="css/normalize.css">-->
<!--          <link rel="stylesheet" href="css/style.css">-->
          <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
          <script src="js/app.js"></script>
        </head>
        <body ng-app="customInterpolationApp">
          <p>Hello world! This is the {{name}} Boilerplate...</p>
          <p>Greetings from {{hometown}}</p>
          <div data-ng-init="allName='Tom S.'">
            <a href="/test/delete/13">DELETE 13</a>
            <br>
            <a href="/test/delete/1977">DELETE 77</a>
            <br>
            <a href="/test/delete">DELETE 0</a>
            <hr>
            <p>The name is: <span data-ng-bind="allName"></span></p>
            <p>Input something in the input box:</p>
            <p>Name : <input type="text" ng-model="name" placeholder="Enter name here"></p>
            <h1>Hello [[name]]</h1>
          </div>
          <hr>
          <div ng-controller="DemoController">
            <p>My first expression: [[ 5 + 5 ]]</p>
            <p>[[label]]</p>
            <p>[[vorname]] -- [[nachname]]</p>

          </div>
          <script>try{Modernizr} catch(e) {document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js">
          <script>
              fetch(url)
                .then(function(res) {
                    return res.json();
                })
                .then(function(res) {
                    console.log(res[0].name);
                    $scope.vorname = res[0].name;
                    $scope.nachname = res[0].surname;
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
