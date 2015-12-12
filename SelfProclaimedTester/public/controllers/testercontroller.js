app = angular.module('selfProclaimedTester');
app.controller('testercontroller',['$scope','$http', '$state', '$location', '$window', '$timeout', function($scope, $http, $state, $location, $window, $timeout)
                 {
	console.log('In tester controller');
$http.post('/getSkills').success(function(response){
	console.log(response.data.preferences);
	console.log(response.status);
	if(response.status == 200){
		//$state.go("listProjects");
		$scope.createdskills = response.data.preferences; 
		if($scope.createdskills==null)
			{
			console.log('I am here with no skills');
			$state.go("skillstype");
			}
		else
			$state.go("testerdashboard");
	}
	else{
		console.log('Some error occured');
	}
	
}
);
}]);
