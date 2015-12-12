app = angular.module('selfProclaimedTester');
app.controller('bugsController',['$scope','$http', '$state', '$location', '$window', '$timeout','$stateParams', 'appService', function($scope, $http, $state, $location, $window, $timeout, $stateParams, appService){
	
	clearInterval(appService.getIntervalId());
	
	projectId = $scope.projectId;
	
	$http.get('/getBugsByProject/'+projectId).success(function(response){
		
		$scope.bugs = response.data;
		$scope.severities = ["low", "medium", "high"];
		console.log("My Sev "+response.data[0]);
		$scope.feedback = "fuck off";
		
	});
	

	$scope.modalData = function(bug){
		
		$http.get('/getBugsComments/'+bug.bug_id).success(function(response){
			
			console.log(response);
			console.log("bug");
			console.log(bug);
			$scope.comments = response.data;
			$scope.bugData = bug;
			
		});
		
	}
	
$scope.actionModal = function(option, bug){
		
	$scope.currentBug = bug;
		if(option == 0){
			$scope.reject = false;
			$scope.closeTheBug = false;
			$scope.approve = true;
			$scope.showRating = true;
		}
		else if(option ==1){
			$scope.approve = false;
			$scope.closeTheBug = false;
			$scope.reject = true;
			$scope.showRating = true;
		}
		else if(option == 2 ){
			$scope.approve = false;
			$scope.reject = false;
			$scope.showRating = false;
			$scope.closeTheBug = true;
		}
		
	}
	
	$scope.approveBug = function(bug){
		
		  
		  $http.post('/approveBug',{rating : bug.rating, feedback : bug.feedback, credits : bug.credits, bug : $scope.currentBug }, function(response){
			 
			  if(response.statusCode == 200){
				  
				  index = $scope.bugs.indexOf(bug);
				  $scope.bugs[index].status = 1;
				  
				  
			  }
			  
		  });
		
	}
	
	$scope.rejectBug = function(bug){
		
		  $http.post('/rejectBug',{rating : bug.rating, feedback : bug.feedback, bug : $scope.currentBug }, function(response){
				 
			  if(response.statusCode == 200){
				  
				  index = $scope.bugs.indexOf(bug);
				  $scope.bugs[index].status = 1;
				  
			  }
			  
		  });
		
	}
	
	$scope.closeBug = function(bug){
		
		$http.post('/closeBug',{feedback : bug.feedback, bug : $scope.currentBug }, function(response){
			 
			  if(response.statusCode == 200){
				  
				  index = $scope.bugs.indexOf(bug);
				  $scope.bugs[index].status = 1;
				  
			  }
			  
		  }); 
		
	}
	
	
	
	$scope.addComment = function(cmt, bugId){
		
		$scope.cmt = "";
		$http.post('/submitComment', {comment : cmt, bugId : bugId}).success(function(response){
			
			sweetAlert("Oops...", "Something went wrong!", "error");
			
			
		})


		
	}
	
	
}]);