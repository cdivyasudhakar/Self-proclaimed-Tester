app = angular.module('selfProclaimedTester');

app.controller('testerprojects', ['$scope', '$http','$uibModal', function($scope, $http, $uibModal)
    
                                  
                                  {
	
	$scope.myflag=1;
	$scope.projectbugs=[{projectId:null,bugs:[]}];
	$scope.buginter=[];
console.log('IN tester projects list controller ');
	$http.get('/gettesterprojects').success(function(data){
		
		console.log('below is the list of  projects ');
		console.log(data);
		$scope.myprojects=data;
		console.log(typeof $scope.myprojects);
		
		
	/*	$http.get('/getbugs').success(function(data){
			console.log('Below is list of bugs obtained');
			console.log(data);
			$scope.bugs=Array.from(data);
			console.log(typeof $scope.bugs);
		   for(x in $scope.myprojects)
			   {
			   
			   
			   for(y in $scope.bugs)
				   
				   {
				   console.log('y value is '+y);
                         if(x.projectId==y.project_id)
                        	 {
                        	 console.log('I am here');
                        	 $scope.buginter.push();
                        	 console.log($scope.buginter);
                        	 
                        	 }
				   }
			   if($scope.buginter.length>0)
				   {
				   $scope.projectbugs.push({projectId:$scope.myprojects[i].projectId,bugs:$scope.buginter});
				   console.log('below is list for particular project id'); 
				   console.log($scope.projectbugs[i]);
				   }
			   $scope.buginter=[];
			   }
			
		}); */
	
	
	});
	
	
	$scope.open = function (bug_id) {
          console.log('Below is bug id ');
          console.log(bug_id);
	    var modalInstance = $uibModal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: '/profile/discussion',
	      controller: 'comments',
	      bug_id: bug_id,
	      resolve: {
	        present_bug: function () {
	          return bug_id;
	        }
	      }
	    });
	};
	

	
		$scope.modalpressed=function()
	{
		console.log('Modal has been pressed');
		
	}
	$scope.reportbug=function(project_id)
	{
		console.log('project ID  selected is '+ project_id);
		var modalInstance = $uibModal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: '/profile/reportbug',
		      controller: 'reportbug',
		      project_id: project_id,
		      resolve: {
		        present_project: function () {
		          return project_id;
		        }
		      }
		    });

	};
	$scope.getbugs=function(id){
		
		console.log('THis is my id '+id);
		var formdata={projectId:id};
		$http.post('/getbugs',formdata).success(function(data){
			console.log('Below are list of projects with bugs u identified');
			console.log(data);
			$scope.projectbugs=data;
		});
		
	}
	
                                  }]);
