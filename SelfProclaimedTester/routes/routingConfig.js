var sql = require('./sql');
var path = require('path');
function routeConfig(app) {
    
    this.app = app;
    this.routeTable = [];
    this.init();
}


routeConfig.prototype.init = function () {
    
    var self = this;
    
    this.addRoutes();
    this.processRoutes();

}


routeConfig.prototype.processRoutes = function () {
    
    var self = this;
    
    self.routeTable.forEach(function (route) {
        
        if (route.requestType == 'get') {
            
         
            self.app.get(route.requestUrl, route.callbackFunction);
        }
        else if (route.requestType == 'post') {
            
            
            self.app.post(route.requestUrl, route.callbackFunction);
        }
        
        
        else if (route.requestType == 'put'){
            
            self.app.put(route.requestUrl, route.callbackFunction);
            
        }
   
    });
}

routeConfig.prototype.addRoutes = function () {
    
    var self = this;
    
    
self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/',
        callbackFunction : function (request, response) {

            response.render('index.ejs');
        }
    });
self.routeTable.push({
    
    requestType : 'get',
    requestUrl : '/index',
    callbackFunction : function (request, response) {

        response.render('index.ejs');
    }
});
self.routeTable.push({
    
    requestType : 'get',
    requestUrl : '/clientHome',
    callbackFunction : function (request, response) {
  	
    	response.render('clientHome.ejs', {title : "Express"});
    }
});

self.routeTable.push({
    
    requestType : 'get',
    requestUrl : '/testerHome',
    callbackFunction : function (request, response) {
  	
    	response.render('testerhome.ejs', {title : "Express"});
    }
});
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/home',
        callbackFunction : function (request, response) {

        	
        	request.session.count = 0;
            response.render('clientHome.ejs', {title : "Express"});
        }
    });
    
self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/clientHomePage',
        callbackFunction : function (request, response) {
    
        	if(request.session.count == 0)
        		response.render('partials/listProjects');
        	else
        		response.render('partials/newTestRequest');
        }
    });
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/partials/:name',
        callbackFunction : function (request, response) {
       	 var name = request.params.name;
       	
            response.render('partials/'+name);
        }
    });
    
 self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/project/:name',
        callbackFunction : function (request, response) {
       	 var name = request.params.name;
       	
            response.render('project/'+name);
        }
    });
self.routeTable.push({
     
     requestType : 'get',
     requestUrl : '/profile/:name',
     callbackFunction : function (request, response) {
    	 var name = request.params.name;
    	
         response.render('partials/'+name);
     }
 });

self.routeTable.push({
    
    requestType : 'post',
    requestUrl : '/bugdetails',
    callbackFunction : function (request, response) {
   
   	 sql.bugdetails(request.body, function(data){
    		
   		 response.send(data);
   		 
   	 });
    	
    }
});

self.routeTable.push({
    
    requestType : 'post',
    requestUrl : '/postcomment',
    callbackFunction : function (request, response) {
   
   	 sql.postcomment(request.session.name, request.body, function(data){
    		
   		 response.send(data);
   		 
   	 });
    	
    }
});

self.routeTable.push({
    
    requestType : 'post',
    requestUrl : '/getcomments',
    callbackFunction : function (request, response) {
   
   	 sql.getcomments(request.body, function(data){
    		
   		 response.send(data);
   		 
   	 });
    	
    }
});

self.routeTable.push({
    
    requestType : 'get',
    requestUrl : '/getprojects',
    callbackFunction : function (request, response) {
   	
   	 sql.getprojects(request.session.testerId, function(data){
   		
   		 response.send(data);
   		 
   	 })
    }
});

self.routeTable.push({
    
    requestType : 'post',
    requestUrl : '/interestedproject',
    callbackFunction : function (request, response) {
   	
   	 sql.interestedproject(request.session.testerId, request.body, function(data){
   		
   		 response.send(data);
   		 
   	 });
    }
});

self.routeTable.push({
    
    requestType : 'get',
    requestUrl : '/getcredits',
    callbackFunction : function (request, response) {
   	
   	 sql.getcredits(request.session.testerId, function(data){
   		
   		 response.send(data);
   		 
   	 });
    }
});

self.routeTable.push({
    
    requestType : 'get',
    requestUrl : '/gettesterprojects',
    callbackFunction : function (request, response) {
   	
   	 sql.gettesterprojects(request.session.testerId, function(data){
   		
   		 response.send(data);
   		 
   	 });
    }
});

self.routeTable.push({
    
    requestType : 'post',
    requestUrl : '/getbugs',
    callbackFunction : function (request, response) {
   	
   	 sql.getbugs(request.session.testerId,request.body,function(data){
   		
   		 response.send(data);
   		 
   	 });
    }
});



self.routeTable.push({
    
    requestType : 'get',
    requestUrl : '/getbugsforchart',
    callbackFunction : function (request, response) {
   
   	 sql.getbugsforchart(request.session.testerId, function(data){
    		
   		 response.send(data);
   		 
   	 });
    	
    }
});


 self.routeTable.push({
     
     requestType : 'get',
     requestUrl : '/newProject/:name',
     callbackFunction : function (request, response) {
    	 var name = request.params.name;
    	
         response.render('newProject/'+name);
     }
 });
self.routeTable.push({
     
     requestType : 'get',
     requestUrl : '/getClientProjects',
     callbackFunction : function (request, response) {
    	
    	 sql.getClientProjects(request.session.clientId, function(data){
    		
    		 response.send(data);
    		 
    	 })
     }
 });

self.routeTable.push({
    
    requestType : 'post',
    requestUrl : '/testupdate',
    callbackFunction : function (request, response) {
   	console.log('reached here');
   	console.log(request.body);
   	 sql.updatedraft(request.body, function(data){
   		 response.send(data);
   	 });
   	 }
    });

self.routeTable.push({
    
    requestType : 'post',
    requestUrl : '/getprojectstate',
    callbackFunction : function (request, response) {
   	console.log('reached here');
   	console.log(request.body);
   	 sql.getprojectstate(request.body, function(data){
   		 response.send(data);
   	 });
   	 }
    });



self.routeTable.push({
    
    requestType : 'post',
    requestUrl : '/upload',
    callbackFunction : function (request, response) {
   	console.log('reached upload section ');
   //	console.log(request);
   	//console.log(request.files.file);
   	request.files.file.toFile(path.join(__dirname, '../public/files'),request.fields.name+".docx",function(err,data)
			{
		if(!err)
			console.log('please check file uploaded');
});
   	 } 
   	 });

self.routeTable.push({
    
    requestType : 'post',
    requestUrl : '/tester_preference',
    callbackFunction : function (request, response) {
   	console.log('reached updating preference section ');
   	console.log(request.body);
   	sql.updatepreference(request.session.testerId, request.body, function(data){
  		 response.send(data);
  	 });
    
    }
   	 });

self.routeTable.push({
    
    requestType : 'post',
    requestUrl : '/deletepreference',
    callbackFunction : function (request, response) {
   	console.log('reached deleting preference section ');
   	console.log(request.body);
   	sql.deletepreference(request.session.testerId, request.body, function(data){
  		 response.send(data);
  	 });
    
    }
   	 });

self.routeTable.push({
    
    requestType : 'post',
    requestUrl : '/planupdate',
    callbackFunction : function (request, response) {
   	console.log('reached final plan update section ');
   	console.log(request.body);
   	//console.log(request.body.formdata);
   	sql.completeproject(request.body,function(data){
   		response.send(data);
   	});
   	 }
   	 });
//sreeram
self.routeTable.push({
    
    requestType : 'get',
    requestUrl : '/getbugsbycategory',
    callbackFunction : function (request, response) {
   	console.log('getting bugs by category ');
   	//console.log(request.body)
   	//console.log(request.body.formdata);
   	sql.getbugsbycategory(request.session.testerId,function(data){
   		response.send(data);
   	});
   	 }
   	 });


self.routeTable.push({
    
    requestType : 'post',
    requestUrl : '/getSkills',
    callbackFunction : function (request, response) {
   	console.log('reached final plan update section ');
   	console.log(request.body);
   	//console.log(request.body.formdata);
   	sql.checkskills(request.session.testerId,function(data){
   		response.send(data);
   	});
   	 }
   	 });
self.routeTable.push({
    
    requestType : 'post',
    requestUrl : '/reportbug',
    callbackFunction : function (request, response) {
   	console.log('reached final plan update section ');
   	console.log(request.body);
   	//console.log(request.body.formdata);
   	sql.reportbug(request.session.testerId, request.body,function(data){
   		response.send(data);
   	});
   	 }
   	 });



self.routeTable.push({
    
    requestType : 'post',
    requestUrl : '/deleteDraft/:id',
    callbackFunction : function (request, response) {
   	
   	 sql.deleteDraft(request.params.id, function(data){
   		
   		 response.send(data);
   		 
   	 })
    }
});

self.routeTable.push({
    
    requestType : 'get',
    requestUrl : '/getClientProjects/:id',
    callbackFunction : function (request, response) {

   	 sql.getDraft(request.params.id, function(data){
   		
   		 response.send(data);
   		 
   	 })
    }
});

self.routeTable.push({
    
    requestType : 'post',
    requestUrl : '/updateProfile',
    callbackFunction : function (request, response) {
  	
   	 sql.updateProfile(request.body, request.session.clientId, function(data){
   		
   		 response.send(data);
   		 
   	 })
    }
});

self.routeTable.push({
    
    requestType : 'get',
    requestUrl : '/clientDetails',
    callbackFunction : function (request, response) {
  	
   	 sql.getClientDetails(request.session.clientId, function(data){
   		
   		 response.send(data);
   		 
   	 })
    }
});
self.routeTable.push({
    
    requestType : 'post',
    requestUrl : '/updatePassword',
    callbackFunction : function (request, response) {
  	
   	 sql.updatePassword(request.session.clientId, request.body.password, function(data){
   		
   		 response.send(data);
   		 
   	 })
    }
});

self.routeTable.push({
    
    requestType : 'get',
    requestUrl : '/getApprovals/:projectId',
    callbackFunction : function (request, response) {
  	
    
   	 sql.getApprovals(request.session.clientId, request.params.projectId, function(data){
   		
   		 response.send(data);
   		 
   	 })
    }
});

self.routeTable.push({
    
    requestType : 'post',
    requestUrl : '/handleRequest/:option',
    callbackFunction : function (request, response) {
  	
    
   	 sql.handleRequest(request.body.projectId, request.body.testerId, request.params.option, function(data){
   		
   		 response.send(data);
   		 
   	 })
    }
});

self.routeTable.push({
    
    requestType : 'post',
    requestUrl : '/validateClient',
    callbackFunction : function (request, response) {
  	
    
   	 sql.validateClient(request.body.credentials.username, request.body.credentials.password, function(data){
   		
   		 if(data.statusCode == 200){
   			 request.session.clientId = data.message.client_id;
   		 	 request.session.email = data.message.email;
   		 	 response.send({statusCode : 200});
   		 }
   		 else
   			 response.send({statusCode : 401});
   		 
   	 })
    }
});

self.routeTable.push({
    
    requestType : 'post',
    requestUrl : '/validateTester',
    callbackFunction : function (request, response) {
  	
    
   	 sql.validateTester(request.body.credentials.email, request.body.credentials.password, function(data){
   		
   		 if(data.statusCode == 200){
   			 
   			 request.session.testerId = data.message.tester_id;
   		 	 request.session.email = data.message.email;
   		 	 request.session.name = data.message.first_name;
   		 	 response.send({statusCode : 200});
   		 }
   		 else
   			 response.send({statusCode : 401});
   		 
   	 })
    }
});

self.routeTable.push({
    
    requestType : 'get',
    requestUrl : '/getTestersByProject/:projectId',
    callbackFunction : function (request, response) {
  	
    
   	 sql.getTestersByProject(request.params.projectId, function(data){
   		
   		 response.send(data);
   		 
   	 })
    }
});
self.routeTable.push({
    
    requestType : 'get',
    requestUrl : '/getBugsOfTester/:testerId/:projectId',
    callbackFunction : function (request, response) {
  	
   	 sql.getBugsOfTester(request.params.testerId, request.params.projectId, function(data){
   		
   		 response.send(data);
   		 
   	 })
    }
});

self.routeTable.push({
    
    requestType : 'get',
    requestUrl : '/getRecentBugs/:projectId',
    callbackFunction : function (request, response) {
  	
   	 sql.getRecentBugs(request.params.projectId, function(data){
   		
   		 response.send(data);
   		 
   	 })
    }
});

self.routeTable.push({
    
    requestType : 'get',
    requestUrl : '/getBugsByProject/:projectId',
    callbackFunction : function (request, response) {
  	
   	 sql.getBugsByProject(request.params.projectId, function(data){
   		
   		 response.send(data);
   		 
   	 })
    }
});

self.routeTable.push({
    
    requestType : 'get',
    requestUrl : '/getBugsComments/:bugId',
    callbackFunction : function (request, response) {
  	
   	 sql.getBugsComments(request.params.bugId, function(data){
   		
   		 response.send(data);
   		 
   	 })
    }
});

self.routeTable.push({
    
    requestType : 'post',
    requestUrl : '/submitComment',
    callbackFunction : function (request, response) {
  	
   	 sql.submitComment(request.body.bugId, request.body.comment,'teja',  function(data){
   		
   		 response.send(data);
   		 
   	 })
    }
});

self.routeTable.push({
    
    requestType : 'post',
    requestUrl : '/approveBug',
    callbackFunction : function (request, response) {
  	
   	 sql.approveBug(request.body,  function(data){
   		
   		 response.send(data);
   		 
   	 })
    }
});

self.routeTable.push({
    
    requestType : 'post',
    requestUrl : '/rejectBug',
    callbackFunction : function (request, response) {
  	
   	 sql.rejectBug(request.body,  function(data){
   		
   		 response.send(data);
   		 
   	 })
    }
});

self.routeTable.push({
    
    requestType : 'post',
    requestUrl : '/closeBug',
    callbackFunction : function (request, response) {
  	
   	 sql.closeBug(request.body,  function(data){
   		
   		 response.send(data);
   		 
   	 })
    }
});

self.routeTable.push({
    
    requestType : 'post',
    requestUrl : '/clientSignup',
    callbackFunction : function (request, response) {
  	
   	 sql.clientSignup(request.body.signUpData,  function(data){
   		
   		 response.send(data);
   		 
   	 })
    }
});

self.routeTable.push({
    
    requestType : 'get',
    requestUrl : '/getBugsData/:projectId',
    callbackFunction : function (request, response) {
  	
   	 sql.getBugsData(request.params.projectId,  function(data){
   		
   		 response.send(data);
   		 
   	 })
    }
});

self.routeTable.push({
    
    requestType : 'post',
    requestUrl : '/createProject',
    callbackFunction : function (request, response) {
  	
   	 sql.createProject(request.session.clientId,  function(data){
   		
   		 response.send(data);
   		 
   	 })
    }
});


}

module.exports = routeConfig;