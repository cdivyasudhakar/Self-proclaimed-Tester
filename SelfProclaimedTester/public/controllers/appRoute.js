app = angular.module('selfProclaimedTester',['ngRoute','ui.router', 'ui.bootstrap','angular.morris-chart', 'ngAnimate','ngFileUpload']);

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
         }).state('profile',{
          url:'/myProfile',
          templateUrl:'partials/client_account',
       }).state('relevant',{
           url:'/relevant',
           templateUrl:'partials/tester_relevant',
           controller:'relevantController'
        }).state('listProjects',{
              url:'/ProjectsList',
              templateUrl:'partials/listProjects',
              
           })
         .state('project',{
             url:'/project',
             templateUrl:'project/projectLayout'
            })
            .state('project.dashboard',{
             url:'/dashboard',
             templateUrl:'project/projectDashboard',
             params : {projectId : null, end_date : null}
            })
            .state('project.testers',{
             url:'/testers',
             templateUrl:'project/Testers'
            })
            .state('project.bugs',{
             url:'/bugs',
             templateUrl:'project/bugs',
             params : {project_id : null}
            })
            .state('newProject',{
             url:'/newProject',
             templateUrl:'newProject/newProject'
             
            })
            .state('newProject.TestType',{
             url:'/TestType',
             templateUrl:'newProject/type_test',
             params : {projectId : null}
            })
            .state('newProject.platform',{
             url:'/platform',
             templateUrl:'newProject/type_platform',
             params : {product : null,
            	 	   projectId : null}
            })
            .state('newProject.product',{
             url:'/product',
             templateUrl:'newProject/type_product',
             params : {projectId : null}
            })
            .state('newProject.plan',{
             url:'/plan',
             templateUrl:'newProject/type_plan',
             params : {projectId : null}
            }).state('testerhome',{
            	url:'/home',
            	templateUrl:'testerhome'
            })
            .state('account',{
             url:'/account',
             templateUrl:'partials/client_account'
            })
            .state('personal',{
             url:'/personal',
             templateUrl:'partials/personal'
            }).state('testerhome.skillstype',{
            	url:'/skills',
            	templateUrl:'partials/tester_platform' 
            })
            .state('testerprofileheader',{
            	url:'/profile',
            	templateUrl:'partials/testerprofileheader' 
            })
            .state('skillstype',{
            	url:'/Skills',
            	templateUrl:'partials/tester_platform',
            	controller:'testerplatformcontroller'
            })
            .state('testerprofileheader.account',{
            	url:'/Account',
            	templateUrl:'partials/tester_account' 
            })
            .state('testerprofileheader.personal',{
            	url:'/profile',
            	templateUrl:'partials/tester_personal' 
            })
            .state('testerdashboard',{
             url:'/dashboard',
             templateUrl:'partials/testerdashboard',
             controller:'testerdashboard'
            })
            .state('workbench',{
             url:'/myprojects',
             templateUrl:'partials/workbench',
            	controller:'testerprojects'
            })
            
            
}]);

app.factory("appService", function(){
	
	var intervalId = 0;
	var state;

	  // public API
	  return {
	    getIntervalId: function () { return intervalId; },
	    setIntervalId: function ( id ) { intervalId = id; },
	    
	  };
});








