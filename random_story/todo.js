var http = require('http')
var url = require('url')
var items = []

var server = http.createServer((req, res) => {
    switch (req.method) {
        case 'POST':
            var item = ''
            req.setEncoding('utf8')
            req.on('data', (chunk) => {
                item += chunk;
            });
            req.on('end', () => {
                var parsedItems = JSON.parse(item);
                for (key in parsedItems) {
                    items.push(parsedItems[key])
                }
                res.end('OK\n')
            })
            break;
        case 'GET':
            var body = items.map(function (item, i) {
                return i + ') ' + item;
            }).join('\n');
            res.setHeader('Content-Length', Buffer.byteLength(body));
            res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
            res.end(body);
            break;
        case 'DELETE':
            var id = '';
            req.setEncoding('utf8');
            req.on('data', (chunk) => {
                id += id.concat(chunk);
            });
            req.on('end', () => {
                var index = parseInt(id);
                if (!items[index]) {
                    res.statusCode = 404;
                    res.end('Invalid item id');
                } else {
                    items.splice(index, 1);
                    res.end('OK\n');
                }
            });
            console.log(items)
            break;
    }
})

server.listen(3000, () => {
    console.log('server listening')
})




const postData = {
    task1: 'buy groceries',
    task2: 'clean house',
    task3: 'pay bills'
};

const data = JSON.stringify(postData);
const optionsPOST = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
    }
};

const reqPOST = http.request(optionsPOST, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
        console.log('No more data in response.');
    });
});

reqPOST.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

const idToDelete = 1;
const idToDeleteJSON = JSON.stringify(idToDelete);

const optionsDELETE = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(idToDeleteJSON)
    }
};

const reqDELETE = http.request(optionsDELETE, (res) => {
    console.log(`STATUS of DELETE req: ${res.statusCode}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
        console.log('No more data in response.');
    });
});



const optionsGET = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET'
};

const reqGET = http.get(optionsGET, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        console.log(rawData);
    });
});

reqGET.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

reqPOST.write(data);
reqPOST.end();


reqDELETE.write(idToDeleteJSON);
reqDELETE.end();
