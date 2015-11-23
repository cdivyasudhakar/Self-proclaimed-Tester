app = angular.module('selfProclaimedTester');
app.controller('newProjectController',['$scope','$http', '$state', '$location', '$window', '$timeout', function($scope, $http, $state, $location, $window, $timeout){
	
	//get projects count
	//if count == 0 $state.go("New Test Request Call")
	//else 
	
	
	$state.go("newProject.TestType");
	
	    
	
	
}]);