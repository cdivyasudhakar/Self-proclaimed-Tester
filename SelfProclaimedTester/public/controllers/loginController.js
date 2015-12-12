app = angular.module('selfProclaimedTester');

app.controller('loginController', ['$scope', '$http', function($scope, $http){
	
	
	$scope.clientLogin = function(credentials){
		$http.post('/validateClient', {credentials : credentials}).success(function(response){
			
			if(response.statusCode == 200)
				window.location.assign('/clientHome');
			else
				$scope.errorMessage = true;
			
		});
	}
	
	$scope.testerLogin = function(credentials){
		
		$http.post('/validateTester', {credentials : credentials}).success(function(response){
			
			if(response.statusCode == 200)
				window.location.assign('/testerHome');
			else
				$scope.errorMessage = true;
			
		});
	}
	
	$scope.clientSignup = function(signup){
		
		
		$http.post('/clientSignup', {signUpData : signup}).success(function(response){
			
			
		});
		
		
	}
	
$scope.testerSignup = function(signup){
		
		
		$http.post('/testerSignup', {signUpData : signup}).success(function(response){
			
			
		});
		
		
	}
	
}]);