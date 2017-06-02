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
		        comment.comment = comment.comment.replace(/'/g, "''");
		        comment.property_id = parseInt(singleproperty.property.pid);
		        comment.user_id = $sessionStorage.user.uid;
		        auth.post('comments', {
		            comment: comment
		        }).then(function (results) {
		            auth.toast(results);
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

		                $scope.comments.push(comment);
		            }
		        });
		    };

		    $scope.toggleComments = function() {
		    	if ($('html, body').css("overflow") != "hidden") {
		    		$('html, body').animate({
			            scrollTop : 0
			        }, 5);
		    		$('html, body').css("overflow", "hidden");
		    	} else {
		    		$('html, body').css("overflow", "auto");
		    	}
		        setTimeout(function() {
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
		        },15);
		    };
		}
	}
);