const Joi = require('joi');
const { TaskDB } = require('../models/tasks');
async function post(req, res) {
    const { name, description, tags, dueDate } = req.body;
    const status = 'To Do';
    const task = new TaskDB({
        name,
        description,
        user: req.user._id,
        tags,
        dueDate,
        status,
        statusHistory: [{ status, date: new Date(), user: req.user._id }]
    });
    await task.save();
    res.send({ message: 'Task created' });
}


async function getTask(req, res) {
    const tasks = await TaskDB.find({ user: req.user._id, _id: req.params.id });
    if (!tasks) return res.status(404).send({ message: 'No tasks found' });
    res.send(tasks);
}

async function get(req, res) {
    let search = req.query.search || '';
    search = search.trim();
    const reSearch = ".*" + search + ".*"

    const task = await TaskDB.find({
        user: req.user._id, 
        $or: [
            { name: { $regex: reSearch, $options: 'i' } },
            { description: { $regex: reSearch, $options: 'i' } },
            { status: { $regex: reSearch, $options: 'i'  } }
        ]
    });
    res.send(task);
}

async function put(req, res) {
    const { name, description, tags, dueDate, status } = req.body;
    const task = await TaskDB.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).send({ message: 'Task not found' });
    task.name = name;
    task.description = description;
    task.tags = tags;
    task.dueDate = dueDate;
    task.status = status;
    task.statusHistory.push({ status: status, date: new Date(), user: req.user._id });
    task.markModified('statusHistory');
    await task.save();
    res.send({ message: 'Task updated' });
}

async function deleteTask(req, res) {
    const task = await TaskDB.deleteOne({ _id: req.params.id, user: req.user._id });
    if (!task.deletedCount) return res.status(404).send({ message: 'Task not found' });
    res.send({ message: 'Task deleted' });
}

module.exports = {
    post: {
        handler: post,
        validator: {
            body: Joi.object({
                name: Joi.string().required(),
                description: Joi.string().required(),
                tags: Joi.array().items(Joi.string()),
                dueDate: Joi.date().optional(),
            })
        }
    },
    "get/:id": getTask,
    get: get,
    "put/:id": {
        handler: put,
        validator: {
            body: Joi.object({
                name: Joi.string().required(),
                description: Joi.string().required(),
                tags: Joi.array().items(Joi.string()),
                dueDate: Joi.date().optional(),
                status: Joi.string().valid(...['To Do', "In Progress", "Done", "Hold"]).required(),
            })
        }
    },
    "delete/:id": deleteTask

};