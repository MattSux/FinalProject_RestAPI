const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
    //res.sendFile('./views/index.html', { root: __dirname }); <-- works the same as the line below
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

module.exports = router;