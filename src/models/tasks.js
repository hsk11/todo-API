const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true, default: 'pending'
    },
    metadata: {
        type: Object,
        required: false,
    },
    statusHistory: {
        type: Array,
        
    },   
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    dueDate: {
        type: Date,
        required: false,
    },
    tags: {
        type: Array,
        required: false,
    }
}, { timestamps: true })

taskSchema.index({ name: 1, user: 1 });
taskSchema.index({ name: 1 });


const TaskDB = mongoose.model('Task', taskSchema);
module.exports = { TaskDB };