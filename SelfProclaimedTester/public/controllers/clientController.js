app = angular.module('selfProclaimedTester',['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {

	   $routeProvider
	   
	   .when('/test', {
	         templateUrl : 'partials/test',
	         controller : 'testController'
	         
	      })
	      
	      .when('/viewGroup/:name', {
	         templateUrl : 'partials/viewGroup',
	         controller : 'viewGroupController'
	         
	         
	      })
	      
	      .when('/about', {
	         templateUrl : 'partials/about',
	         controller : 'aboutController'
	         
	      })
	      
	       .when('/createGroup', {
	         templateUrl : 'partials/createGroup',
	         
	      })
	      
	      .when('/newsFeed', {
	         templateUrl : 'partials/newsFeed',
	         controller : 'newsFeedController'
	         
	      })
	      
	      .when('/testers', {
	         templateUrl : 'partials/testers',
	         controller : 'listTestersController'
	      })
	      
	      .when('/dashboard', {
	         templateUrl : 'partials/clientDashboard',
	         controller : 'clientDashboardController'
	      })
	      
	      .when('/', {
	    	  
	    	  templateUrl : 'clientHomePage',                            // This is for node understanding
	    	  
	      })
	      
	      .otherwise({redirectTo: "/"});
	}]);

app.controller('clientController',['$scope','$http','$location', '$window', '$timeout', function($scope, $http, $location, $window, $timeout){
	
	
	
	    
	
	
}]);




