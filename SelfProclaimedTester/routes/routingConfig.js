var sql = require('./sql');
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
    	
    	 sql.getClientProjects(1, function(data){
    		
    		 response.send(data);
    		 
    	 })
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
}

module.exports = routeConfig;