app = angular.module('selfProclaimedTester');

app.controller('projectController', ['$state','$stateParams','$scope', '$http', 'appService', function($state,$stateParams, $scope, $http, appService){
	
	
    var testersData = [];
	projectId = $stateParams.projectId;
	$scope.projectId = projectId;
	end_date = $stateParams.end_date;
	//$state.go('project.dashboard');
	console.log("Project Id is "+projectId);
	
	$http.get('/getBugsData/'+projectId).success(function(response){
		var approved = 0;
		var pending = 0;
		var rejected = 0;
		var closed = 0;
		if(response.statusCode == 200){
			for(i in response.message){
				if(response.message[i].status == 0)
					pending++;
			if(response.message[i].status == 1)
				approved++;
			if(response.message[i].status == 2)
				rejected++;
			if(response.message[i].status == 3)
				closed++;
			}	
		}
		
		pendingObject = {label : "Pending", value : pending};
		approvedObject = {label : "Approved", value : approved};
		rejectedObject = {label : "Rejected", value : rejected};
		closedObject = {label : "Closed", value : closed};
		$scope.morrisBugs = [pendingObject, approvedObject, rejectedObject,closedObject];
		
	});
	
	
	$http.get('/getApprovals/'+projectId).success(function(response){
		
		$scope.testers = response.data;
	});
	
	$scope.getBugsOfTester = function(testerId){
		
		$http.get('/getBugsOfTester/'+testerId+'/'+projectId).success(function(response){
			
			$scope.TesterBugs = response.data;
			
		});
	}
	$http.get('/getRecentBugs/'+projectId).success(function(response){
		
		if(response.status ==200)
			$scope.recentBugs = response.data;
	});
	$http.get('/getTestersByProject/'+projectId).success(function(response){
		
		console.log(response.status);
		if(response.status == 200)
			$scope.projectTesters = response.testerData;
		console.log(response.testerData);
			for( i in response.testerData){
				
				bugcount = verify(response.testerData[i].tester_id,response.bugCount)
				
				if(bugcount == 0){
					object = {data  : response.testerData[i],
							  count : 0};
				}
				else
					{
					object = {data  : response.testerData[i],
							  count : bugcount};
					
					}
				testersData.push(object);
			}
			
			$scope.projectTesters = testersData;
			$scope.morrisTesters = [{label : "Testers", value : testersData.length}];
		
	})
	
	function verify(testerId,array){
		console.log("testerId "+ testerId);
		for( j in array){
			
			if(testerId  == array[j].tester_id)
				return array[j].count;
			
		}
		return 0;
	}
	
	$scope.viewTesterModal = function(tester){
		
		$scope.tester = tester;
		
	}
	
	$scope.handleRequest = function(testerId, option){
		
		if(option == 0)
			option = "approve";
		else
			option = "reject";
		$http.post("/handleRequest/"+option, {projectId : projectId, testerId : testerId}).success(function(response){
			
			if(response.status == 200)
				console.log("Successful");
			else
				console.log("Failed");
				
			
		});
		
	}

		
	
	
	
	
	
	
	
	
	
	
	
	 target_date = new Date(end_date).getTime() + 86400000 + 28799999;
	   
	// variables for time units
	 var days, hours, minutes, seconds;
	 
	    
	// get tag element
	 countdown = document.getElementById('countdown');
	    
	// update the tag with id "countdown" every 1 second
	intervalId = setInterval(function () {
	 
	    // find the amount of "seconds" between now and target
	    var current_date = new Date()
	    
	    var seconds_left = (target_date - current_date) / 1000;
	 
	    // do some time calculations
	    days = parseInt(seconds_left / 86400);
	    seconds_left = seconds_left % 86400;
	     
	    hours = parseInt(seconds_left / 3600);
	    seconds_left = seconds_left % 3600;
	     
	    minutes = parseInt(seconds_left / 60);
	    seconds = parseInt(seconds_left % 60);
	     
	    // format countdown string + set tag value
	    
	    
	    dayId = document.getElementById('days')
	    hourId = document.getElementById('hour')
	    minuteId = document.getElementById('minutes')
	    secondId = document.getElementById('seconds')
	    
	     dayId.innerHTML = days;
	     hourId.innerHTML = hours;
	     minuteId.innerHTML = minutes;
	     secondId.innerHTML = seconds;
	 
	}, 1000);

	    appService.setIntervalId(intervalId);
	

}]);