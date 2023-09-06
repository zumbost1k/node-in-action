var http = require('http');
var formidable = require('formidable');
const show = (req, res) => {
    var html =
        ' <form method="post" action="/" enctype="multipart/form-data">' +
        ' <p><input type="text" name="name" /></p>' +
        ' <p><input type="file" name="file" /></p>' +
        '  <p><input type="submit" value="Upload" /></p>' +
        ' </form>'

    res.setHeader('Content-type', 'text/html')
    res.setHeader('Content-Length', Buffer.byteLength(html))
    res.end(html)
}

function badRequest(res) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Bad Request');
}



function upload(req, res) {
    if (!isFormData(req)) {
      res.statusCode = 400;
      res.end('Bad Request: expecting multipart/form-data');
      return;
    }
  }
  
  function isFormData(req) {
    var type = req.headers['content-type'] || '';
    return 0 == type.indexOf('multipart/form-data');
  }
var server = http.createServer(function (req, res) {

    switch (req.method) {
        case 'GET':
            show(req, res);
            break;
        case 'POST':
            upload(req, res);
            break;
        default:
            badRequest(res);
    }

});

server.listen(3000);