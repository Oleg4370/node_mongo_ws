/**
 * Created by oleh on 23.07.17.
 */

const blog = require('../models/articles');
const WebSocketServer = new require('ws');

exports.newWebSocket = function(port) {
    const clients = {};
    const webSocketServer = new WebSocketServer.Server({
        port: port
    });
    webSocketServer.on('connection', function(ws) {

        const id = Date.now();
        clients[id] = ws;
        console.log("New connection - " + id);

        ws.on('message', function(message) {

            let newComment = JSON.parse(message);

            blog.id(newComment.id,function(err,doc){
                if(err){
                    console.log(err);
                    return false;
                }else{
                    let commentsArray = doc.comments.slice();
                    commentsArray.push({nickname: newComment.nickname, comment: newComment.comment});
                    //request to update comments in db
                    blog.newComment(newComment.id, commentsArray, function (err,result) {
                        if(err){
                            console.log(err);
                            return false;
                        }
                        for (let key in clients) {
                            clients[key].send(message);
                            console.log(key);
                        }
                    })
                }

            });

        });

        ws.on('close', function() {
            console.log('connection - ' + id+ ' - is closed');
            delete clients[id];
        });

    });
};
