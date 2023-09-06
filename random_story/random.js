// var server = http.createServer((req, res) => {
//     var url = parse(req.url)
//     var path = join(root, url.pathname)
//     var stream = fs.createReadStream(path)
//     stream.pipe(path)
// })
const http = require('http')
const fs = require('fs')

var server = http.createServer((req, res) => {
    var url = parse(req.url)
    var path = join(root, url.pathname)
    fs.stat(path, (err, stat) => {
        if (err) {
            if ('ENOENT' === err.code) {
                res.statusCode = 404
                res.end('Not Found')
            }
            else {
                res.status = 500
                res.end('Server Error')
            }
        }
        else {
            res.setHeader('Content-Length', stat.size)
            var stream = fs.createReadStream(path)
            stream.pipe(res)
            stream.on('error', (err) => {
                res.status = 500
                res.end('Server Error')
            })
        }
    })
})

server.listen(3000, () => {
    console.log('server listening on port 3000')
})