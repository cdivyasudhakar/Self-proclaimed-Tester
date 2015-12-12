app = angular.module('selfProclaimedTester');

app.controller('comments', ['$scope', '$http','$uibModal','$uibModalInstance','present_bug', function($scope, $http, $uiModal,$uibModalInstance,present_bug)
    
                                 {
	console.log('Present bug_id is ');
	console.log(present_bug);
	//console.log($uibModalInstance);
	//console.log($uibModal);
	//console.log($scope);
	var formdata={bug_id:present_bug};
	$http.post('/bugdetails',formdata).success(function(data){
		$scope.bugdetails=data[0];
		console.log(data);
	});
	$http.post('/getcomments',formdata).success(function(data){
		console.log('Below are list of comments ');
		console.log(data);
		$scope.comments=data;
		
	});
	
	console.log('IN the comments controller ');
	
	$scope.postedcomment = function () {
		//$uibModalInstance.close();
		console.log('comment  clicked');
		console.log(present_bug);
		var formdata={bug_id:present_bug,description:$scope.comment,role:"tester"};
		console.log($scope.comment);
		console.log($scope.comments);
		//	var x =$scope.comments.length;
		//$scope.comments[x].description=$scope.comment;
		//$scope.comments.push($scope.comment);
		$http.post('/postcomment',formdata).success(function(data){
			
			$http.post('/getcomments',formdata).success(function(data){
				console.log('Below are list of comments ');
				console.log(data);
				$scope.comments=data;
				
			});
		});
		
	  };

	  $scope.cancel = function () {
		  $uibModalInstance.dismiss();
		  console.log('Dismiss clicked');
	  };
	
                                 }]);