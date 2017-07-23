document.addEventListener('DOMContentLoaded', function () {
    var f = document.forms.newComment,
        socket = new WebSocket("ws://localhost:8081"),
        postId = f.id.value;
    f.addEventListener('submit', function(evt){
        evt.preventDefault();

        var outgoingMessage = {
            nickname: f.nickname.value,
            comment: f.comment.value,
            id: f.id.value
        };

        socket.send(JSON.stringify(outgoingMessage));

        socket.onmessage = function(event) {
            var newCommentMessage = JSON.parse(event.data);
            console.log(newCommentMessage);
            if(newCommentMessage.id == postId){
                var newComment = document.createElement('div'),
                    commentWrapper = document.querySelector('.comments-wrap');
                newComment.className = 'comment-item';
                newComment.innerHTML = '<strong class="name">'+newCommentMessage.nickname+'</strong><p class="text">'+newCommentMessage.comment+'</p>';
                commentWrapper.insertBefore(newComment, commentWrapper.firstChild);

                f.reset();
            }
        };


        /*var xhr = new XMLHttpRequest();

         var body = 'nickname=' + encodeURIComponent(f.nickname.value) +
         '&comment=' + encodeURIComponent(f.comment.value)+
         '&id=' + encodeURIComponent(f.id.value);

         xhr.open("POST", '/api/new-comment', true);
         xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
         xhr.onreadystatechange = function() {
         if (this.readyState != 4) return;
         if (xhr.status != 200) {
         alert(xhr.status + ': ' + xhr.statusText);
         }
         var newComment = document.createElement('div'),
         commentWrapper = document.querySelector('.comments-wrap');
         newComment.className = 'comment-item';
         newComment.innerHTML = '<strong class="name">'+f.nickname.value+'</strong><p class="text">'+f.comment.value+'</p>';
         commentWrapper.insertBefore(newComment, commentWrapper.firstChild);

         f.reset();
         };
         xhr.send(body);*/
    });
    /*

     var formData = new FormData();
     formData.append('nickname',f.nickname.value);
     formData.append('comment',f.comment.value);

     console.log(formData);
     var xhr = new XMLHttpRequest();
     xhr.open("POST", "/api/new-comment");
     xhr.send(formData);
     */

});
