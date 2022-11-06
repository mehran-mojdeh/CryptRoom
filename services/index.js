const express = require('express')
const router = express.Router()

const Messages = require('./messages');

let last;

function generateLast() {
  last = Math.floor( Math.random() * 1000 );
}
generateLast();

router.get('/messages', async(req, res) => {
  if (req.query.l == last) {
    res.status(204).send();
    return;
  }
  const messages = await Messages.getMessages()
  .then(d => d)
  .catch(e => {
    console.error(e);
    res.status(500).send();
    throw e;
  });
  // formating data
  const data = messages.map(m => {return {'name':m[0], 'message': m[1], 'signiture': m[2]}});
  res.status(200).json({data, last})
});

router.post('/messages', async(req, res) => {
  const {name, message, signiture} = req.body;
  if (!name || !message || !signiture) {
    res.status(400).json({message: 'Bad request!'});
    return;
  }
  //validation
  const name_pattern = /^\w{1,15}$/g
  if (!name_pattern.exec(name)) {
    res.status(400).json({message: 'Invalid input.'});
    return;
  }
  const msg_pattern = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/g
  if (!msg_pattern.exec(message)) {
    res.status(400).json({message: 'Invalid input.'});
    return;
  }
  const sign_pattern = /^[a-f0-9]{64}/g
  if (!sign_pattern.exec(signiture)) {
    res.status(400).json({message: 'Invalid input.'});
    return;
  }

  await Messages.sendMessage(name, message, signiture)
  .then((d) => {
    generateLast();
    res.status(200).json({data: d, last})
  })
  .catch(e => {
    console.error(e);
    res.status(500).send();
  })
})

module.exports = router