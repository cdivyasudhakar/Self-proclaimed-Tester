app = angular.module('selfProclaimedTester',['ngRoute','ui.router','ngFileUpload']);

app.config([ '$urlRouterProvider', '$stateProvider',
      function($urlRouterProvider, $stateProvider) {
         $urlRouterProvider.otherwise('/TestType');
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
             url:'/projectLayout',
             templateUrl:'project/projectLayout'
            })
            .state('project.dashboard',{
             url:'/dashboard',
             templateUrl:'project/projectDashboard',
             params : {projectId : null }
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
             templateUrl:'newProject/newProject'
             
            })
            .state('newProject.TestType',{
             url:'/TestType',
             templateUrl:'newProject/type_test'
            })
            .state('newProject.platform',{
             url:'/platform',
             templateUrl:'newProject/type_platform',
             params : {product : null}
            })
            .state('newProject.product',{
             url:'/product',
             templateUrl:'newProject/type_product'
            })
            .state('newProject.plan',{
             url:'/plan',
             templateUrl:'newProject/type_plan'
            })
            .state('account',{
             url:'/account',
             templateUrl:'partials/client_account'
            })
            .state('personal',{
             url:'/personal',
             templateUrl:'partials/personal'
            })
            
            
}]);







