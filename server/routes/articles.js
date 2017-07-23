const express = require('express');
const router = express.Router();

const blog = require('../../controllers/frontend');

/* GET home page. */

router.get('/:url', blog.getByUrl);

module.exports = router;
