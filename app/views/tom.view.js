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
          <link rel="manifest" href="site.webmanifest">
          <link rel="icon" href="https://www.thomas-schulte.de/html/images/favicon.ico">
          <!-- Place favicon.ico in the root directory -->
          <link rel="stylesheet" href="css/normalize.css">
          <link rel="stylesheet" href="css/style.css">
          <meta name="theme-color" content="#fafafa">
        </head>
        <body>
          <p>Hello world! This is the {{name}} Boilerplate...</p>
          <p>Greetings from {{hometown}}</p>
          <script src="js/vendor/modernizr-3.11.6.min.js"></script>
          <script src="js/app.js"></script>
          <script> 
            const url = 'http://localhost:8888/test';
            fetch(url)
                .then(function(res) {
                    console.log(res);
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
