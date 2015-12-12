app = angular.module('selfProclaimedTester');

app.controller('reportbug', ['$scope', '$http','$uibModal','$uibModalInstance','present_project', function($scope, $http, $uiModal,$uibModalInstance,present_project)
    
      {
	
 console.log('In report bug mechanism');
    
 $scope.cancel = function () {
	  $uibModalInstance.dismiss();
	  console.log('Dismiss clicked');
 };
 
 $scope.postreport=function(){
	 console.log('Here the project id is '+present_project);
	 console.log($scope.bugname);
	 console.log($scope.bugdesc);
	 console.log($scope.reproduce);
	 var formdata={project_id:present_project,bug_name:$scope.bugname,description:$scope.bugdesc,steps_to_produce:$scope.reproduce,severity:$scope.severity};
	  console.log(formdata);
	$http.post('/reportbug',formdata).success(function(data){
		 $uibModalInstance.dismiss();
	});
 }
 
 
                                 }]);
