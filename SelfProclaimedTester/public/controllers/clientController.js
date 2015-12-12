app = angular.module('selfProclaimedTester');
app.controller('clientController',['$scope','$http', '$state', '$location', '$window', '$timeout','appService', function($scope, $http, $state, $location, $window, $timeout, appService){

	
	
	clearInterval(appService.getIntervalId());

	
	
	
	
	$http.get('/getClientProjects').success(function(response){
		
		if(response.status == 200){
			$state.go("listProjects");
			$scope.createdProjects = response.data; 
			
		}
		else{
			$http.post('/createProject').success(function(response){
				//{"TestType":"","product":"","platforms_selected" :[]}
				$state.go("newProject.TestType", {projectId : response.message});
			})
		}
		
	}); 

	$scope.viewProject = function(projectId, end_date){
	
		$state.go('project.dashboard',{'projectId' : projectId, 'end_date' : end_date});
	}
	
	$scope.deleteDraft = function(projectId){
	
	    $http.post('/deleteDraft/'+projectId).success(function(response){
	    	
	    	if(response == "success")
	    		window.location.reload();
	    	else
	    		console.log("Problem with deletion");
	    	
	    		
	    })
	}
	$scope.newtest=function()
	{
		
		$http.post('/createProject').success(function(response){
			//{"TestType":"","product":"","platforms_selected" :[]}
			$state.go("newProject.TestType", {projectId : response.message});
		});
		
	};
	$scope.completeDraft = function(projectId){
		
		
		//var text1 = {TestType : "", product: "android", preferences : ["abcd", "defg", "hijk"]};
		
		//console.log(JSON.stringify(text1));
		
		//text = JSON.parse(JSON.stringify(text1));
		
		//console.log(text.TestType);
	
		$http.get('/getClientProjects/'+projectId).success(function(response){
			
			console.log(response);
			if( response.status == 200)
				
				attributes = JSON.parse(response.data.project_attributes);
			
				if(attributes.TestType == "")
					$state.go('newProject.TestType', {projectId : projectId});
				else if(attributes.product == "")
					$state.go('newProject.product', {projectId : projectId});
				else if(attributes.platforms_selected.length  == 0){
					console.log("I m here "+attributes.product)
					$state.go('newProject.platform',{product : attributes.product, projectId : projectId});
				}
			
			
		}); 
		
		
		
	};
	
	
}]);