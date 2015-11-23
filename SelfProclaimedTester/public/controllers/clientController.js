app = angular.module('selfProclaimedTester');
app.controller('clientController',['$scope','$http', '$state', '$location', '$window', '$timeout', function($scope, $http, $state, $location, $window, $timeout){
	
	//get projects count
	//if count == 0 $state.go("New Test Request Call")
	//else 
	
	$http.get('/getClientProjects').success(function(response){
		
		if(response.status == 200){
			$state.go("listProjects");
			$scope.createdProjects = response.data; 
			
		}
		else
			$state.go("newProject")
		
	});
	
	$scope.viewProject = function(projectId){
		
		$state.go('project',{'projectId' : projectId})
	}
	
	    
	
	
}]);