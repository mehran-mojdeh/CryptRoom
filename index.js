const express = require('express');
const cors = require('cors');

require('dotenv').config();
const { PORT } = process.env;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const Messages = require('./services/messages');

const app = express();

app.use(cors());
app.use(express.json());

//API Routes//
app.get('/messages', async(req, res) => {
  const messages = await Messages.getMessages()
  .then(d => d)
  .catch(e => console.error(e));
  // formating data
  const data = messages.map(m => {return { 'message': m[0], 'signiture': m[1]}});
  res.status(200).json({data})
});

// views
// app.use(express.static('views'));


app.listen(port = PORT||3000, () => {
  console.log(`server started listening on port ${port}.`);
})