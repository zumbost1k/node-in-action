var fs = require('fs')
var path = require('path')
var args = process.argv.splice(2)
var command = args.shift()
var taskDescription = args.join('')
var file = path.join(process.cwd(), '/.tasks')

function loadOrInitializeTaskArray(file, cb) {
    fs.exists(file, (exists) => {
        var tasks = []
        if (exists) {
            fs.readFile(fole, 'utf8', (err, data) => {
                if (err) { throw err }
                var data = data.toString()
                var tasks = json.parse(data || '[]')
                cb(tasks)
            })
        }
        else {
            cb([])
        }
    })
}

function listTasks(file) {
    loadOrInitializeTaskArray(file, function (tasks) {
        for (var i in tasks) {
            console.log(tasks[i]);
        }
    });
}

switch (command) {
    case 'list':
        listTasks(file)
        break
    case 'add':
        addTask(file, taskDescription)
        break
    default:
        console.log(`Usage: ${process.argv[0]} list|add [taskDescription]`)
}