const {addRoutes,authValidator} = require('../libs/route');
const user = require('../controller/user');
const task = require('../controller/tasks');

module.exports = {
    '*':authValidator,
    users: addRoutes(user),
    tasks: addRoutes(task)
}

