const _query = require('../../db');

module.exports = {
  getMessages: async() => {
    const res = await _query('SELECT msg, sign FROM message',[])
    .then(d => d)
    .catch(e=>console.error(e));
    return res;
  },

}