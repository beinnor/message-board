const mongoose = require('mongoose')

const Message = mongoose.model('Message', {
  title: {
    type: String,
    required: true,
    trim: true
  },
  body: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: String,
    required: true,
    trim: true
  }
})

module.exports = Message