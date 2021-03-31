const express = require('express');
const router = express.Router();
const axios = require('axios');

const meme_api = 'https://meme-api.herokuapp.com/gimme';

const responseTemplate = (title, url) => {
  return (
      `
      <div style="display: flex; flex-direction: column; align-content: center; justify-content: center; align-items: center; justify-items: center">
        <h2>${title}</h2>
        <img src="${url}" style="max-height: 400px;max-width: 400px" alt='Meme Image'/>
      </div>
      `
  );
};
router.get('/meme', (req, res) => {
  axios.get(meme_api)
       .then(({data}) => {
         res.send(responseTemplate(data.title, data.url));
       })
       .catch(error => {
         console.warn(`Error: ${error.toString()}`);
         res.status(501);
         res.send('The server of this server is busy. Please try again 😅');
       });
});

module.exports = router;
