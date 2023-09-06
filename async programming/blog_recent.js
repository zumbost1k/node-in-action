var http = require('http')
var fs = require('fs')




function getTitles(res) {
    fs.readFile(
        './titles.json', (err, data) => {
            if (err) { return hadError(err, res) }
            getTemplate(JSON.parse(data.toString()), res)
        }
    )
}

function getTemplate(titles, res) {
    fs.readFile(
        './template.html', (err, data) => {
            if (err) { return hadError(err, res) }
            formatHtml(titles, data.toString(), res)
        }
    )
}

function formatHtml(titles, tmpl, res) {
    var html = tmpl.replace(/%/g, titles.join('<li></li>'))
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(html)
}

function hadError(err, res) {
    console.error(err)
    res.end('Server Error')
}

var server = http.createServer((req, res) => {
    getTitles(res)
})

server.listen(3000, function () {
    console.log("Server listening on port 3000.")
})