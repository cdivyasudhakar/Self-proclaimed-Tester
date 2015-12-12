app = angular.module('selfProclaimedTester');
app.controller('testerdashboard',['$scope','$http', '$state', '$location', '$window', '$timeout', function($scope, $http, $state, $location, $window, $timeout)
{
	
	
a=3;
$scope.medium=0;
$scope.low=0;
$scope.credits=0;
$scope.high=0;
$http.get('/getcredits').success(function(data){
console.log('Bugs for the user is ');
$scope.credits=data[0].credits;
Morris.Donut({
	  element: 'donut-example',
	  data: [
	    {label: "credits", value: $scope.credits},
	 
	  ]
	});	

console.log($scope.credits);
});

$http.get('/getbugsbycategory').success(function(data){
console.log(data);	
$scope.pending=0;
$scope.approved=0;
$scope.rejected=0;
$scope.closed=0;

for(i=0;i<data.length;i++)
	{
      if(data[i].status==0)
    	  {
    	  $scope.pending++;
    	  }
      else if(data[i].status==1)
    	  {
    	  $scope.approved++;
    	  }
      else if (data[i].status==2)
    	  {
    	  $scope.rejected++;
    	  }
	}
console.log('these are approved ones '+$scope.approved);
console.log('these are Rejected  ones '+$scope.rejected);
console.log('these are pending ones '+$scope.pending);
var data2 = google.visualization.arrayToDataTable([ ['Label', 'Value'], ['Accepted', $scope.approved], ['Rejected', $scope.rejected],
                               					 ['Pending', $scope.pending]
                               				   ]);

                               var options2 = {
                               width: 400, height: 120,
                               redFrom: 90, redTo: 100,
                               yellowFrom:75, yellowTo: 90,
                               minorTicks: 5
                               };
var chart4 = new google.visualization.Gauge(document.getElementById('efficiency'));
chart4.draw(data2,options2);
});


$http.get('/getbugsforchart').success(function(data){
console.log('Bugs got for the chart ');
console.log(data);
if(data.status == 200){
//console.log(data[0].severity);
for(i=0;i<data.data.length;i++)
{
console.log('hii');
if(data.data[i].severity==="medium")
{
console.log('In medium');
$scope.medium++;
}
if(data.data[i].severity==="low")
{
$scope.low++;
}
if(data.data[i].severity==="high")
{
$scope.high++;
}
}
}
console.log('this is '+$scope.medium);
console.log('this is '+$scope.low);
console.log('this is '+$scope.high);
// console.log('value of medium is '+ $scope.medium);
//medium = Number($scope.medium);
//console.log(medium);

google.load('visualization', '1', {packages:['corechart',"corechart","gauge"]});


var data1 = google.visualization.arrayToDataTable([
['My Bugs','Total Bugs'],
['Severity High  Bugs Reported by you', $scope.high],
['Medium Bugs Reported by you', $scope.medium],
['Low Bugs Reported by you',$scope.low],

]);
var options1 = {
title: 'Reported Bugs Seggregation'
};   




//  var chart = new google.visualization.LineChart(document.getElementById('chartline'));

//chart.draw(data, options);


var chart3 = new google.visualization.PieChart(document.getElementById('totalBugs'));


chart3.draw(data1,options1);





});



var data = google.visualization.arrayToDataTable([
['My Projects', 'Relevant Projects'],
['Working Projects', a],
['Relevant Projects', 2],

]);
var options = {
title: 'Projects Related to my skills'
};
var chart2 = new google.visualization.PieChart(document.getElementById('chartpie'));
chart2.draw(data, options);
}
]);
