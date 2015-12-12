app = angular.module('selfProclaimedTester');

app.controller('myProfileController', ['$scope', '$http', function($scope, $http){
	
	$scope.clientDetails = "";
	$http.get('/clientDetails').success(function(response){
		if(response.status == 200){
			console.log("Successful");
			$scope.client = response.data;
			
		}
		else
			console.log("failed");
		
	});
	
	$scope.updateProfile = function(clientProfile){
		
		$http.post('/updateProfile', clientProfile).success(function(response){
			if(response.status == 200)
				console.log("Successful");
			else
				console.log("failed");
			
		});
		
	};
	
$scope.updatePassword = function(password){
		
		if(password.existingPassword != $scope.client.password)
			{
				$scope.successDisplay = false;
				$scope.errorDisplay = "true";
				$scope.errorMessage = "Existing Password is invalid";
			
			}
		else if(password.newPassword != password.repeatPassword)
		{
		
			console.log("Existing Password is invalid");
			$scope.successDisplay = false;
			$scope.errorDisplay = "true";
			$scope.errorMessage = "Password and confirm password does not match";
		
		}
		else
			{
				$http.post('/updatePassword', {password : password.newPassword}).success(function(response){
				
					$scope.errorDisplay = false;
					$scope.successDisplay = "true";
				});
				
			}
			
	};
	
	
}]);