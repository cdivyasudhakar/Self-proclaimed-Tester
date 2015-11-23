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
	    
	    
	  	    