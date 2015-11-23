app = angular.module('selfProclaimedTester');

app.controller('projectController', ['$state','$stateParams','$scope', '$http', function($state,$stateParams, $scope, $http){
	
	projectId = $stateParams.projectId;
	$state.go('project.dashboard');
	
	$scope.collapseClick = function(clickedValue){
		
		console.log("Clicked "+clickedValue);
	}
	

}]);