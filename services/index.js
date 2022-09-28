const express = require('express')
const router = express.Router()

const Messages = require('./messages');

router.get('/messages', async(req, res) => {
  const messages = await Messages.getMessages()
  .then(d => d)
  .catch(e => console.error(e));
  // formating data
  const data = messages.map(m => {return { 'message': m[0], 'signiture': m[1]}});
  res.status(200).json({data})
});

module.exports = router