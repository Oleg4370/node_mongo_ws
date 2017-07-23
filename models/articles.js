/**
 * Created by oleh on 27.04.17.
 */
const db = require('../db');
const ObjectId = require('mongodb').ObjectId; //need to convert to ObjectId to find by id in Mongo database

const collectionName = 'articles';

exports.all = function(callBack){
    db.get().collection(collectionName).find().sort({"created":1}).limit(10).toArray(function(err,docs){
        callBack(err,docs);
    });
};

exports.id = function (id,callBack) {
    db.get().collection(collectionName).findOne({'_id':ObjectId(id)},function(err, doc){
        callBack(err,doc);
    });
};

exports.url = function (url,callBack) {
    db.get().collection(collectionName).findOne({'url':url},function(err, doc){
        callBack(err,doc);
    });
};

exports.newComment = function(id, comments, callBack){
    db.get().collection(collectionName).updateOne({_id:ObjectId(id)}, {$set:{comments: comments}}, function(err, result){
        callBack(err,result);
    });
};

/*
exports.update = function(id, name, callBack){
    db.get().collection(collectionName).updateOne(
        {_id:ObjectId(id)}, {name:name},
        function(err,result){
            callBack(err,result);
        });
};

exports.delete = function (id,callBack) {
    db.get().collection(collectionName).deleteOne(
        {_id: ObjectId(id)},
        function(err,result){
            callBack(err,result);
        })
};*/
