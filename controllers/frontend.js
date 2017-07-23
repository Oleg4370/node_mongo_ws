/**
 * Created by oleh on 27.04.17.
 */
const blog = require('../models/articles');

exports.getAll = function (req,res) {
    blog.all(function(err,docs){
            if(err){
                console.log(err);
                return res.sendStatus(500);
            }
            res.render('index', { articles: docs });

        }
    )
};

exports.getByUrl = function (req,res) {
    blog.url(req.params.url,function(err,doc){
            if(err){
                console.log(err);
                return res.sendStatus(500);
            }
            res.render('post', { post: doc });
        }
    )
};