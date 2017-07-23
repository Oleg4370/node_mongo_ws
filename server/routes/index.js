const express = require('express');
const router = express.Router();

const blog = require('../../controllers/frontend');

/* GET home page. */

router.get('/',blog.getAll);

module.exports = router;
