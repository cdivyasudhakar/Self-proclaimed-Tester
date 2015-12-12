app = angular.module('selfProclaimedTester');

app.controller('relevantController', ['$scope', '$http', function($scope, $http){
	
	console.log('In relevant controller ');
	var formdata={tester_id:1}
	$http.post('/getSkills',formdata).success(function(response){
		console.log(response);
		console.log('below are my skills');
		$scope.myprojects=JSON.parse(response.data.preferences);
		console.log($scope.myprojects);
		$http.get('/getprojects').success(function(data){
			console.log(data);
			$scope.wholeprojects=data;
			$scope.relevant=[];
			console.log($scope.wholeprojects);
			for(i=0;i<$scope.wholeprojects.length;i++)
				{
			          if($scope.wholeprojects[i].project_attributes.product==$scope.myprojects.product)	
			        	  $scope.relevant.push($scope.wholeprojects[i]);
			          console.log('This is relevant');
			          console.log($scope.relevant);
			          
				}
		});
		
	});
	$scope.addtointerested=function(val){
		
		console.log('Hey!! I am interested in this porject ');
		console.log("value received "+$scope.relevant[val]);
		console.log($scope.relevant[val].projectId);
		index = $scope.relevant[val]
		var formdata={project_id:$scope.relevant[val].projectId};
		$http.post('/interestedproject',formdata).success(function(data){
			$scope.relevant.splice(index,1);
			//window.location.reload();
		});
	};
	
	
	
}]);