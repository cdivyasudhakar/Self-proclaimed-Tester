app = angular.module('selfProclaimedTester');
app.controller('newProjectController',['$state','$scope','$http', '$stateParams', '$location', '$window', '$timeout','Upload', function($state, $scope, $http, $stateParams, $location, $window, $timeout, Upload){
	
	console.log("product is "+$stateParams.product);
	
		
	console.log("Project Id "+ $stateParams.projectId);
	
	$scope.formdata={};
	$scope.product_platforms={website:["InternetExplorer","Firefox","Google Chrome","Safari"],
			android:["MarshMallow","Lollipop","Kitkat","Jelly Bean","IceCream Sandwich"],
			iphone:["Ios9.2","Ios9.1","Ios9.0","Ios8.0","Ios7.0"],
			windows:["Windows 10","Windows 8.1","Windows 8","Windows 7.5","Windows 7"],
			software:["Windows 10","Ubuntu","Mac","Windows 8","Windows 7"]
	};
	$scope.formdata.projectid= $stateParams.projectId;
	$scope.formdata.project_attributes={};
	$scope.platforms_selected=[];
	$scope.typeoftest="";
	$scope.typeofproduct="";
	//console.log('hii');
	//$state.go("newProject.TestType");
	if($stateParams.product != null)
		$scope.typeofproduct = $stateParams.product;
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
		 console.log($scope.typeoftest);
		 var formdata={projectId:$stateParams.projectId};
		 $http.post('/getprojectstate',formdata).success(function(data){
				console.log('Below is the exact state in database');
				console.log(data[0]);
				console.log(JSON.parse(data[0].project_attributes));
				$scope.formdata.project_attributes=JSON.parse(data[0].project_attributes);
				$scope.formdata.project_attributes.TestType=$scope.typeoftest;
		 console.log('Below may be the final version of objec');
		 console.log($scope.formdata);
		 $http.post('/testupdate',$scope.formdata).success(function(data){
			console.log(data);
			$state.go("newProject.product",{projectId:$stateParams.projectId});
		 });
		 
		 
	 });
	}
	 
	 
	 $scope.productcheck=function(){
		console.log('I\'m here in another product with project id ');
		console.log($stateParams.projectId);
		var formdata={projectId:$stateParams.projectId};
		$http.post('/getprojectstate',formdata).success(function(data){
			console.log('Below is the exact state in database');
			console.log(data[0]);
			console.log(JSON.parse(data[0].project_attributes));
			$scope.formdata.project_attributes=JSON.parse(data[0].project_attributes);
			console.log('Going to set ');
			console.log($scope.typeofproduct);
			$scope.formdata.project_attributes.product=$scope.typeofproduct;
			console.log('this may be final version of product');
			console.log($scope.formdata);
		//	console.log('This time I l push this ');
			//console.log($scope.formdata);
			//console.log("platform array is "+$scope.product_platforms[$scope.typeofproduct]);
			$http.post('/testupdate',$scope.formdata).success(function(data){
				 console.log(data);
				 $state.go("newProject.platform",{projectId:$stateParams.projectId});
			});
			
			
		});
		
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
			var formdata={projectId:$stateParams.projectId};
			$http.post('/getprojectstate',formdata).success(function(data){
				console.log('Below is the exact state in database');
				console.log(data[0]);
				console.log(JSON.parse(data[0].project_attributes));
				$scope.formdata.project_attributes=JSON.parse(data[0].project_attributes);
				console.log('Going to set ');
               console.log($scope.platforms_selected);
			//$scope.formdata.projecy_attributes.platforms_selected=
			
			$scope.formdata.project_attributes.platforms_selected=$scope.platforms_selected;
			console.log('Below may be final version of platforms')
			console.log($scope.formdata);
			$http.post('/testupdate',$scope.formdata).success(function(data){
				 console.log(data);
				 $state.go("newProject.plan",{projectId:$stateParams.projectId});

			 });

			
					 });
	 }
					 
		 
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
			      data: {file: file, name:$stateParams.projectId },

			  
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