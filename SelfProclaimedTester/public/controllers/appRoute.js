app = angular.module('selfProclaimedTester',['ngRoute','ui.router']);

/*app.config(['$routeProvider', function ($routeProvider) {

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
	      .when('/profile', {
	    	  
	    	  templateUrl : 'partials/client_account'                            // This is for node understanding
	    	  
	      })
	      .when('/newproject', {
	    	  
	    	  templateUrl : 'partials/type_test'                            // This is for node understanding
	    	  
	      })
	      .when('/typeproduct', {
	    	  
	    	  templateUrl : 'partials/type_product'                            // This is for node understanding
	    	  
	      })
	      .when('/typeplatform', {
	    	  
	    	  templateUrl : 'partials/type_platform'                            // This is for node understanding
	    	  
	      })
	      .when('/typeplan', {
	    	  
	    	  templateUrl : 'partials/type_plan'                            // This is for node understanding
	    	  
	      })
	      .when('/contactus', {
	    	  
	    	  templateUrl : 'partials/contact'                            // This is for node understanding
	    	  
	      })
	      .when('/personal', {
	    	  
	    	  templateUrl : 'partials/personal'                            // This is for node understanding
	    	  
	      })
	      .when('/account', {
	    	  
	    	  templateUrl : 'partials/client_account'                            // This is for node understanding
	    	  
	      })
	      .when('/bugs', {
	    	  
	    	  templateUrl : 'partials/bugs'                            // This is for node understanding
	    	  
	      })
	      .when('/', {
	    	  
	    	  templateUrl : 'partials/bugs'                            // This is for node understanding
	    	  
	      })
	      
	      .otherwise({redirectTo: "/"});
	}]); */




app.config([ '$urlRouterProvider', '$stateProvider',
      function($urlRouterProvider, $stateProvider) {
         $urlRouterProvider.otherwise('/');
         $stateProvider.state('approveRequests', {
            url : '/approveRequests',
            templateUrl : 'partials/approveRequests'
          }).state('viewReviews',{
            url : '/viewReviews',
            templateUrl : 'partials/viewReviews',
         }).state('statistics',{
            url:'/statistics',
            templateUrl:'partials/statistics',
         }).state('contactus',{
           url:'/contactus',
           templateUrl:'partials/contact',
        }).state('home',{
            url:'/home',
            templateUrl:'home',
            controller : 'clientController'
         }).state('profile',{
          url:'/myProfile',
          templateUrl:'partials/client_account',
       })
       	 .state('listProjects',{
              url:'/ProjectsList',
              templateUrl:'partials/listProjects',
              
           })
         .state('project',{
             url:'/projectLayout/:projectId',
             templateUrl:'project/projectLayout'
            })
            .state('project.dashboard',{
             url:'/dashboard',
             templateUrl:'project/projectDashboard'
            })
            .state('project.testers',{
             url:'/testers',
             templateUrl:'project/Testers'
            })
            .state('project.bugs',{
             url:'/bugs',
             templateUrl:'project/bugs'
            })
            .state('newProject',{
             url:'/newProject',
             templateUrl:'newProject/newProject',
             controller : 'newProjectController',
            })
            .state('newProject.TestType',{
             url:'/TestType',
             templateUrl:'newProject/type_test'
            })
            .state('newProject.platform',{
             url:'/platform',
             templateUrl:'newProject/type_platform'
            })
            .state('newProject.product',{
             url:'/product',
             templateUrl:'newProject/type_product'
            })
            .state('newProject.plan',{
             url:'/plan',
             templateUrl:'newProject/type_plan'
            })
            
            
}]);







