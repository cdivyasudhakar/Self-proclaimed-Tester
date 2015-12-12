app = angular.module('selfProclaimedTester');
app.controller('testerplatformcontroller',['$scope','$http', '$state', '$location', '$window', '$timeout', function($scope, $http, $state, $location, $window, $timeout)
    {


$scope.formdata={};
$scope.products=['website','android','iphone','windows','software'];
$scope.product_platforms={website:["InternetExplorer","Firefox","Google Chrome","Safari"],
		android:["MarshMallow","Lollipop","Kitkat","Jelly Bean","IceCream Sandwich"],
		iphone:["Ios9.2","Ios9.1","Ios9.0","Ios8.0","Ios7.0"],
		windows:["Windows 10","Windows 8.1","Windows 8","Windows 7.5","Windows 7"],
		software:["Windows 10","Ubuntu","Mac","Windows 8","Windows 7"]
};
var formdata={tester_id:1}
$http.post('/getSkills',formdata).success(function(response){
	console.log(response.data.preferences);
	$scope.skills=JSON.parse(response.data.preferences);
	console.log(typeof($scope.skills));
});
$scope.getplatforms=function()
{
console.log(' Item u selected is '+$scope.product);		
$scope.platforms=$scope.product_platforms[$scope.product];
}
$scope.addpreference=function(){
console.log('u r trying to add a preference');	
var formdata={"product":$scope.product,"platform":$scope.platform_selected};

console.log(formdata);


$http.post('/tester_preference',formdata).success(function(data){
console.log(data);
$http.post('/getSkills').success(function(response){
	console.log(response.data.preferences);
	$scope.skills=JSON.parse(response.data.preferences);
	console.log(typeof($scope.skills));
});

});
$state.go('skillstype');	
};
$scope.deletepreference=function(index){
	
console.log('U r trying to delete a preference ');	
console.log(index);
console.log($scope.skills[index]);
$http.post('/deletepreference',$scope.skills[index]).success(function(data){

	$http.post('/getSkills').success(function(response){
		console.log(response.data.preferences);
		$scope.skills=JSON.parse(response.data.preferences);
		console.log(typeof($scope.skills));
	});	
	
	
});
};

}]);