const _query = require('../../db');

// Delete old messages
setInterval(_query('DELETE FROM message WHERE "date" < CURRENT_DAY - 1', []), 3600000);

module.exports = {
  getMessages: async() => {
    const res = await _query('SELECT name, msg, sign FROM message ORDER BY "date"', [])
    .then(d => d)
    .catch(e=>{
      throw new Error(e);
    });
    return res;
  },
  sendMessage: async(name, message, signiture) => {
    const res = await _query(
      'INSERT INTO message (name, msg, sign) VALUES($1, $2, $3)',
      [name, message, signiture])
    .then(d => {
      return { name, message, signiture };
    })
    .catch(e => {
      throw new Error(e);
    });
    return res;
  }
}