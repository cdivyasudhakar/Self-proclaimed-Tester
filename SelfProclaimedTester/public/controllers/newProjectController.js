app = angular.module('selfProclaimedTester');
app.controller('newProjectController',['$scope','$http', '$state', '$location','$window', '$timeout','Upload', function($scope, $http, $state, $location, $window, $timeout, Upload){
	
	//get projects count
	//if count == 0 $state.go("New Test Request Call")
	//else 
	$scope.formdata={};
	$scope.product_platforms={website:["InternetExplorer","Firefox","Google Chrome","Safari"],
			android:["MarshMallow","Lollipop","Kitkat","Jelly Bean","IceCream Sandwich"],
			iphone:["Ios9.2","Ios9.1","Ios9.0","Ios8.0","Ios7.0"],
			windows:["Windows 10","Windows 8.1","Windows 8","Windows 7.5","Windows 7"],
			software:["Windows 10","Ubuntu","Mac","Windows 8","Windows 7"]
	};
	$scope.formdata.projectid=1;
	$scope.formdata.project_attributes={};
	$scope.platforms_selected=[];
	$scope.typeoftest="";
	$scope.typeofproduct="";
	//console.log('hii');
	//$state.go("newProject.TestType");
	$scope.typeselected=function(val){
		
	$scope.typeoftest=val;
	$scope.formdata.project_attributes.TestType=val;
		
	};
	$scope.productselected=function(val){
	$scope.typeofproduct=val;
	console.log('Hey!! the product you selected is '+$scope.typeofproduct)
		
	};
	
	$scope.type=function(){
		 console.log('I\'m here');
		 console.log($scope.formdata);
		 $http.post('/testupdate',$scope.formdata).success(function(data){
			 console.log(data);
		 });
		 $state.go("newProject.product");
		 
	 }; 
	 
	 
	 $scope.productcheck=function(){
		console.log('I\'m here in another product'); 
		$scope.formdata.project_attributes.product=$scope.typeofproduct;
		console.log('This time I l push this ');
		console.log($scope.formdata);
		console.log("platform array is "+$scope.product_platforms[$scope.typeofproduct]);
		$http.post('/testupdate',$scope.formdata).success(function(data){
			 console.log(data);
		 });
		$state.go("newProject.platform");
	 };
	 
	 
	 $scope.mybox1=function(val)
	 {
		 
	console.log("value i got "+val);
	var x = $scope.platforms_selected.length;
	var a = $scope.platforms_selected.indexOf(val);
	if(a==-1)
		$scope.platforms_selected.push(val);
	else
		delete $scope.platforms_selected[a];
	
	console.log('Whole array of values selected is ');
	console.log($scope.platforms_selected);
	 };
	 
	 $scope.platformcheck=function(){
			console.log('I\'m here in Platform '); 
			console.log($scope.formdata);
			//$scope.formdata.posted_date=$scope.posted_date;
			//console.log($scope.formdata.posted_date);
			$scope.formdata.project_attributes.platforms_selected=$scope.platforms_selected;
			console.log($scope.formdata);
			$http.post('/testupdate',$scope.formdata).success(function(data){
				 console.log(data);
				 $state.go("newProject.plan");

			 });

			
					 };
					 
		 
		  $scope.uploadPic = function(file)
		  {
			  
			  console.log('HElllllllllllllllllllooooooooooo');
			 console.log($scope.formdata);
			 //console.log($scope.formdata.projectid);
			 console.log($scope.my_project_username);
			 console.log($scope.my_url);
			// $scope.formdata.description=$scope.sdescription;
			/* var mydata={"project_name":$scope.my_project_name,description:$scope.my_description,
			  url:$scope.my_url,
			  app_username:$scope.my_app_username,
			 app_password: $scope.my_app_password,
			 posted_date:$scope.my_posted_date,
			 status:'A'
			 
			 };
			 console.log(mydata);
			 */
			 console.log($scope.formdata);
			    file.upload = Upload.upload({
			      url: '/upload',
			      data: {file: file},
			    });

			    $http.post('/planupdate',$scope.formdata).success(function(data){
					 console.log(data);
					 $state.go("home");

				 });
			    file.upload.then(function (response) {
			      $timeout(function () {
			        file.result = response.data;
			      });
			    }, function (response) {
			      if (response.status > 0)
			        $scope.errorMsg = response.status + ': ' + response.data;
			    }, function (evt) {
			      // Math.min is to fix IE which reports 200% sometimes
			      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			    });
			   // $state.go("home");
			    }
	
	
}]);