var request = require('request').defaults({proxy:'http://172.19.159.235:8080', agent:false});
request('https://www.google.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Print the google web page.
  }
})