const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
    index: true
  },
  status: String,
  dueDate: {
    type: Date,
    default: Date.now,
  }
}, {versionKey: false})

const task = module.exports = mongoose.model('Task', userSchema, 'task')
