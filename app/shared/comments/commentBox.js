app.component(
	'commentBox',
	{
    	bindings: {},
        templateUrl: 'app/shared/comments/commentBox.html',
        controller: function($scope, $http, auth, singleproperty, comments, $rootScope, $sessionStorage) {
		    $scope.comments = comments.comments;
		    $scope.newcomment = {};
		    $scope.newcomment = {comment: '', property_id: '', user_id: ''};

		    $scope.newComment = function(comment) {
		        comment.comment = comment.comment.replace(/'/g, "\\'");
		        comment.property_id = parseInt(singleproperty.property.pid);
		        comment.user_id = $sessionStorage.user.uid;
		        auth.post('comments', {
		            comment: comment
		        }).then(function (results) {
		            auth.toast(results);
		            comment.comment_id = results.comment_id;
		            $("#comment-input-box").val("");
		            if(results.status == "success") {
		                $("#comment-form").val('');

		                $("#comment-box").animate({
		                    scrollTop: "10000px"
		                }, 1000);

		                comment.username = $sessionStorage.user.name;

		                var currentdate = new Date();
		                if (currentdate.getHours() > 12) {
		                    var hours = currentdate.getHours() - 12;
		                    var ampm = "PM";
		                } else {
		                    var hours = currentdate.getHours();
		                    var ampm = "AM";
		                }
		                var datetime = (currentdate.getMonth()+1) + "/"
		                + currentdate.getDate()  + "/"
		                + currentdate.getFullYear() + " at "
		                + hours + ":"
		                + currentdate.getMinutes() + ampm;

		                comment.created = datetime;
										comment.comment = comment.comment.replace(/\\'/g, "'");
		                $scope.comments.push(comment);
		            }
		        });
		    };

		    $scope.toggleComments = function() {
	        	var lb = $("#lightbox");
		        if (lb.css("display") == "block") {
		            lb.css("display", "none");
		            $("html,body").css("height","unset");
		            $("footer").css("margin-top", "0px");
		        } else {
		            lb.css("display", "block");
		            $("html,body").css("height","100%");
		            $("footer").css("margin-top", "200px");
		        }
		    };

		    $scope.deleteComment = function(comment) {
          var ok = confirm("Are you sure you want to delete this comment?");
					comment.table = "comments";
					comment.column = "comment_id";
					comment.value = comment.comment_id;
					delete comment.comment_id;
          if (ok) {
            auth.post('deleteItem', {
              item: comment
            }).then(function(res){
                auth.toast(res);
                if (res.status == "success") {
                  var index = $scope.comments.indexOf(comment);
                  if (index > -1) {
                    $scope.comments.splice(index, 1);
                  }
                }
            });
          }
        };
		}
	}
);
