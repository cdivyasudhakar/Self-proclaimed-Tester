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
		else{
			
			$state.go("newProject.TestType");
		}
		
	});
	
	$scope.viewProject = function(projectId){
		
		$state.go('project',{'projectId' : projectId});
	}
	
	$scope.deleteDraft = function(projectId){
	
	    $http.post('/deleteDraft/'+projectId).success(function(response){
	    	
	    	if(response == "success")
	    		window.location.reload();
	    	else
	    		console.log("Problem with deletion");
	    	
	    		
	    })
	}
	
	$scope.completeDraft = function(projectId){
		
		
		//var text1 = {TestType : "", product: "android", preferences : ["abcd", "defg", "hijk"]};
		
		//console.log(JSON.stringify(text1));
		
		//text = JSON.parse(JSON.stringify(text1));
		
		//console.log(text.TestType);
	
		$http.get('/getClientProjects/'+projectId).success(function(response){
			
			if( response.status == 200)
				
				attributes = JSON.parse(response.data.project_attributes);
			
				if(attributes.TestType == "")
					$state.go('newProject.TestType');
				else if(attributes.product == "")
					$state.go('newProject.product');
				else if(attributes.preferences.length == 0){
					$state.go('newProject.platform',{product : attributes.product});
				}
			
			
		}); 
		
	}
	
	
}]);