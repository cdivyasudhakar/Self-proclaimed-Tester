mysql = require('mysql');

function connectDB(){
	  var connection = mysql.createConnection({
	        host: '127.0.0.1',
	        user: 'root',
	        password : '',
	        database : 'selfproclaimedtester',
	        multipleStatements : true
});
	  
connection.connect(function (err) {
	        if (err) { throw err; }
	    });
	    return connection;
}

exports.getClientProjects = function(clientId, callback){
	 
	  var connection = connectDB();
	  var query = "select project_name, projectId, status from project, client c where project.client_id = c.client_id  and c.client_id =  "+clientId+" order by status desc";
	  
	    connection.query(query, function (err, rows, fields) {
	  
	      if(rows.length >0)
	    	  	callback({status : 200, data : rows});
	    	  else
	    		callback({status : 400, data : "No rows"});  
	      
	    });
}

exports.deleteDraft = function(projectId, callback){
	 
	  var connection = connectDB();
	  var query = "delete from project where projectId = "+Number(projectId);
	  console.log("projectId "+ projectId);
	  
	    connection.query(query, function (err, rows, fields) {
	  
	    	if(!err)
	    		callback("success");
	    	else
	    		callback("failed");    		
	    });
}

exports.getDraft = function(projectId, callback){
	 
	  var connection = connectDB();
	  var query = "select * from project where projectId = "+Number(projectId);
	  
	    connection.query(query, function (err, rows, fields) {
	  
	    	if(!err)
	    		callback({status : 200, data : rows[0]});
	    	else
	    		callback({status : 400, data : "No rows"});    		
	    });
}
	    
exports.updatedraft=function(message, callback){
	var project_attributes=JSON.stringify(message.project_attributes);
	console.log(project_attributes);
	var connection = connectDB();
	var query="update selfproclaimedtester.project set project_attributes="+"'"+project_attributes+"' where projectId="+message.projectid;
	console.log('Query going to be executed is '+query);
	 connection.query(query, function (err, rows, fields) {
		  
	    	if(!err)
	    		callback({status : 200});
	    	else
	    		{
	    		callback({status : 400});
	    		throw err;
	    		}
	    });
	
}   
	  	    
exports.completeproject=function(message,callback){
	var connection = connectDB();
	//var date=new Date(message.posted_date);
	//dateString = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().substr(2,2);
	
	date=message.posted_date.substring(0, 9);
	console.log(date);
	var query="update selfproclaimedtester.project set project_name="+"'"+message.my_project_name+"',description='"+message.my_description+"' ,url='"+message.my_url+"',app_username='"+message.my_app_username+"',app_password='"+message.my_app_password+"',posted_date='"+date+"',status=\'A\' where projectid="+message.projectid;
	console.log(query);
	
	connection.query(query, function (err, rows, fields) {
		  
    	if(!err)
    		callback({status : 200});
    	else
    		{
    		callback({status : 400});
    		throw err;
    		}
    });
	
	
}
