const Messages = require('../models/message')


// Get all messages
getAllMessages = async (req, res, nest) => {
  try {
    const messages = await Messages.find({})
    res.send(messages)
  } catch (error) {
    res.status(500).send(error)
  }
}

// Post new message
postNewMessage = async (req, res, next) => {
  const messages = new Messages(req.body)

  try {
    await messages.save()
    res.status(201).send(messages)

  } catch (error) {
    res.status(400).send(error)
  }
}

module.exports = {
  getAllMessages,
  postNewMessage
}