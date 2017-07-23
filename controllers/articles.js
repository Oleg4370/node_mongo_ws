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
            res.send(docs);
        }
    )
};

exports.getById = function (req,res) {
    blog.id(req.params.id,function(err,doc){
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    });
};

exports.getByUrl = function (req,res) {
    blog.url(req.params.url,function(err,doc){
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    });
};

exports.newComment = function (req, res) {
    console.log(req.body);
    blog.id(req.body.id,function(err,doc){
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }else{
            var commentsArray = doc.comments.slice();
            commentsArray.push({nickname:req.body.nickname, comment:req.body.comment});
            console.log(commentsArray);
            //request to update comments in db
            blog.newComment(req.body.id, commentsArray, function (err,result) {
                if(err){
                    console.log(err);
                    return res.sendStatus(500);
                }
                res.sendStatus(200);
            })
        }

    });
};
/*
exports.updateOne = function (req, res) {
    Artists.update(req.params.id,req.body.name,function (err,result) {
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
};

exports.deleteOne = function (req,res) {
    Artists.delete(req.params.id,function (err, result) {
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
};*/
