/**
 * Created by oleh on 03.05.17.
 */
const express = require('express');
const router = express.Router();

const blog = require('../../controllers/articles');

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});

/* GET users listing. */
router.get('/articles', blog.getAll);

router.get('/articles/:id', blog.getById);

//POST requests for adding new review
router.post('/new-comment',blog.newComment);

//PUT data
// router.put('/players/:id',artistsController.updateOne);

//DELETE data
// router['delete']('/players/:id',artistsController.deleteOne);

module.exports = router;
