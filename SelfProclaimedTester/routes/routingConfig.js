
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
    
 
}

module.exports = routeConfig;