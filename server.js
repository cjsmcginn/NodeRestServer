/**
 * Created by Chris on 10/12/13.
 */
var Router = require('node-simple-router');
var http = require('http');
var router = Router();

router.get('/', function (request, response) {
    response.end('Home page');
});

router.get('/hello/:who', function (request, response) {
    response.end("Hello, " + request.params.who);
});

router.get('/jobs/:query', function (request, response) {
    var options = {
        hostname: 'api.usa.gov',
        path: '/jobs/search.json?query=' + request.params.query,
        method: 'GET'
    };
    var req = http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            response.write(chunk);
            response.end();

        });
    });
    req.on('error', function(e) {
        response.write(e.message);
        response.end();
    });
    req.write('data\n');
    req.write('data\n');
    req.end();
});
server = http.createServer(router);

server.listen(8889);