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
	  var query = "select * from project, client c where project.client_id = c.client_id  and c.client_id =  "+clientId+" order by status desc";
	  
	    connection.query(query, function (err, rows, fields) {
	  
	    	console.log(err);
	      if(rows.length >0)
	    	  	callback({status : 200, data : rows});
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
	
	date=message.posted_date.substring(0, 10);
	console.log('Below is the posted date');
	console.log(message.posted_date);
	console.log(date);
	var query="update selfproclaimedtester.project set project_name="+"'"+message.my_project_name+"',description='"+message.my_description+"' ,url='"+message.my_url+"',app_username='"+message.my_app_username+"',app_password='"+message.my_app_password+"',end_date='"+date+"',status=\'A\' where projectid="+message.projectid;
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

exports.checkskills=function(testerId, callback){
	var connection = connectDB();
	
  var query="select preferences from selfproclaimedtester.tester where tester_id="+testerId;	
console.log(query);
connection.query(query,function(err,rows,fields){
	console.log(err);
if(!err)
	callback({status:200,data:rows[0]});
else
	callback({status:400});
});
}
exports.updatepreference=function(testerId, message,callback){
	var connection = connectDB();
	console.log(message);
	var query="select preferences from selfproclaimedtester.tester where tester_id="+testerId;

console.log(query);
connection.query(query,function(err,rows,fields){
	if(!err)
		{
		//console.log(rows);
		if(rows[0].preferences==null)
			{
			var x=[];
			console.log('Nothing inserted into preferences ');
			x.push(message);
			console.log(x);
			var newpref=JSON.stringify(x);
			var newqry="update selfproclaimedtester.tester set preferences='"+newpref+"' where tester_id="+testerId;
			console.log(newqry);
			connection.query(newqry,function(err,rows,fields){
				if(err)
					throw err;
				callback(null);
				
			});
			}
		else
			{
			var myalreadypref=rows[0].preferences;
			console.log('My already stored preference is ');
			console.log(myalreadypref);
			//var check=myalreadypref.contains({"tester_id":message.tester_id,"product":message.product,"platform":message.platform});
			var plat=message.platform;
			console.log('Looking for this one in function');
			console.log(plat);
			check =myalreadypref.search(plat);
			console.log('new check is '+check);
			console.log('This is the one which I am checking for index ');
			x=message;
			console.log(x);
			if(check==-1)
				{
				myalreadypref=JSON.parse(myalreadypref);
				myalreadypref.push(message);
				myalreadypref=JSON.stringify(myalreadypref);
				console.log('This is the new one with added your new one');
				console.log(myalreadypref);
				var newqry="update selfproclaimedtester.tester set preferences='"+myalreadypref+"' where tester_id="+testerId;
				connection.query(newqry,function(err,rows,fields){
					if(err)
						throw err;
					callback(null);
					
				});
				}
			
			
			}
		
		}
	else
		callback({status:400});
	});

}

exports.deletepreference=function(testerId, message,callback){
	console.log(message);	
	var connection = connectDB();
	console.log(message);
	var query="select preferences from selfproclaimedtester.tester where tester_id="+testerId;

	console.log(query);
	connection.query(query,function(err,rows,fields)
			{
	if(!err)
		{
		var preferences=JSON.parse(rows[0].preferences);
		console.log(preferences);
		console.log(message.platform);
		//=preferences.indexOf(message);
		//console.log(ind);
		for(i=0;i<preferences.length;i++)
			{
		if(preferences[i].platform===message.platform)
			{
			console.log('Matched');
			delete preferences[i];
			console.log(preferences);
			  for (var i = 0; i < preferences.length; i++) {
				    if (preferences[i] == undefined) {         
				      preferences.splice(i, 1);
				      i--;
				    }
			}
			  break;
			  
			
			 
			  
		}
			}
		 console.log(preferences);
		  
		  var myquery="update selfproclaimedtester.tester set preferences='"+JSON.stringify(preferences)+"' where tester_id="+testerId;
		  connection.query(myquery,function(err,rows,fields)
					{
			if(err)
		  throw err;
			callback(null);
					});
		}
		
	else
		throw err;
			});

	}

exports.getprojects=function(testerId, callback)
{
	var connection = connectDB();

var myquery="select * , DATE_FORMAT(posted_date, '%d %b %y') as posted_date from selfproclaimedtester.project where projectId not in (select project_id from `selfproclaimedtester`.`tester_project` where tester_id ="+testerId+" );";
console.log(myquery);
	  connection.query(myquery,function(err,rows,fields)
				{
		  console.log(err);
		if(err)
	  throw err;
		else
		callback(rows);
				});
	};

exports.interestedproject=function(testerId, message,callback)

	{
		console.log(message);
		var connection = connectDB();
		var query="insert into selfproclaimedtester.`tester_project` values("+testerId+","+message.project_id+",'R',now())";
		console.log(query);
		
		  connection.query(query,function(err,rows,fields)
					{
			if(err)
		  throw err;
			else
			callback(rows);
					});
		};
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

exports.gettesterprojects=function(testerId, callback)
{
	var connection = connectDB();
	var query="SELECT `project`.`projectId`,`project`.`client_id`,`project`.`project_name`,`project`.`description`,`project`.`url`,`project`.`app_username`,`project`.`app_password`,`project`.`posted_date`, DATE_FORMAT(end_date, '%d %b %y') as end_date,`project`.`project_attributes`,`project`.`status`FROM `selfproclaimedtester`.`project` where projectId  in (select project_id from `selfproclaimedtester`.`tester_project` where tester_id = "+testerId+" and status='A');";
    console.log(query);	
    connection.query(query,function(err,rows,fields)
			{
	if(err)
  throw err;
	else
	callback(rows);
			});
};

exports.getbugs=function(testerId,message,callback)
{
	var connection=connectDB();
	var query="select project_id,bug_id,bug_name,status,feedback from selfproclaimedtester.bugs where tester_id="+testerId+" and project_id ="+message.projectId;
	console.log('Query for the geting bugs for a project');
	console.log(query);
	connection.query(query,function(err,rows,fileds)
			{
		     if(err)
		    	 throw err;
		     else
		    	 callback(rows);
		
		
			});

};

exports.reportbug=function(testerId, message,callback)
{
	console.log(message);
	var connection = connectDB();
	var query="insert into selfproclaimedtester.bugs(project_id,bug_name,description,steps_to_produce,severity,tester_id)values("+message.project_id+",'"+message.bug_name+"','"+message.description+"','"+message.steps_to_produce+"','"+message.severity+"',"+testerId+");";
	console.log(query);
	 connection.query(query,function(err,rows,fields)
				{
		if(err)
	  throw err;
		else
		callback(rows);
				});
};

exports.postcomment=function(name, message,callback)
{
	var connection = connectDB();
	var query="insert into  selfproclaimedtester.comments(bug_id,name,description,timestamp,role) values("+message.bug_id+",'"+name+"','"+message.description+"',now(),'"+message.role+"')";
	console.log(query);
	connection.query(query,function(err,rows,fields){
		if(err)
			throw err;
		
		else
			callback(rows);
	});
	
};

exports.getbugsforchart=function(testerId, callback)
{
	var connection = connectDB();
	var query="select severity from selfproclaimedtester.bugs where status=1 and tester_id="+testerId;
	console.log(query);
	connection.query(query,function(err,rows,fields){
		
		if(rows != undefined && rows.length >0)
			callback({status : 200, data : rows});
		else
			callback({status : 404, message : "not found"});
	});

};

exports.getcredits=function(testerId, callback)
{
var connection=connectDB();
var query="select credits from selfproclaimedtester.tester where tester_id="+testerId;
connection.query(query,function(err,rows,fields){
	if(err)
		throw err;
	//console.log(fields);
	callback(rows);
});

}

exports.getcomments=function(message,callback)
{
	var connection = connectDB();
	var query="select * from selfproclaimedtester.comments where bug_id="+message.bug_id+" order by timestamp";
	console.log(query);
    connection.query(query,function(err,rows,fields){
    	if(err)
			throw err;
		
		else
			callback(rows);
    });
    

}

exports.bugdetails=function(message,callback)
{
	
console.log(message);
var connection = connectDB();
var query="select * from selfproclaimedtester.bugs where bug_id ="+message.bug_id;
console.log(query);
connection.query(query,function(err,rows,fields){
	if(err)
		throw err;
	
	else
		callback(rows);
});

};

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
	    
exports.updateProfile = function(clientData, clientId, callback){
	 
	  var connection = connectDB();
	  
	  updateData = {first_name : clientData.first_name,
			  		last_name : clientData.last_name,
			  		organizaton_name : clientData.organization,
			  		}
	  var query = "UPDATE client SET ? WHERE client_id = ?";
	  
	    connection.query(query, [updateData, { client_id: Number(clientId) }], function (err, rows, fields) {
	  
	    	if(!err)
	    		callback({status : 200, data : "success"});
	    	else{
	    		console.log(err);
	    		callback({status : 400, data : "failed"});
	    	}
	    });
}

exports.getClientDetails = function(clientId, callback){
	 
	  var connection = connectDB();
	  
	  var query = "select * from client where client_id = "+Number(clientId);
	  
	    connection.query(query, function (err, rows, fields) {
	  
	    	if(!err)
	    		callback({status : 200, data : rows[0]});
	    	else
	    		callback({status : 400, data : "No rows"});    		
	    });
}
	    
exports.updatePassword = function(clientId, password, callback){
	   	 
	  	  var connection = connectDB();
	  	  
	  	  console.log("Password is "+password);
	  	  
	  	var query = "UPDATE client set password = "+password+" WHERE client_id ="+clientId;
		  
	    connection.query(query, function (err, rows, fields) {
	  
	    	console.log(rows);
	    	if(!err)
	    		callback({status : 200, data : "success"});
	    	else{
	    		console.log(err);
	    		callback({status : 400, data : "failed"});
	    	}
	    }); 
}

exports.getApprovals = function(clientId, projectId, callback){
  	 
	  var connection = connectDB();
	  
	  console.log("clientId is "+clientId);
	  console.log("project Id is "+projectId);
	  
	var query = "select tp.tester_id, first_name, last_name, mobile, email, reputation, preferences from tester_project tp, tester t where t.tester_id = tp.tester_id and project_id ="+Number(projectId)+" and status = 'R'";
	console.log(query);
  connection.query(query, function (err, rows, fields) {
  	console.log(rows);
  	if(!err)
  		callback({status : 200, data : rows});
  	else{
  		console.log(err);
  		callback({status : 400, data : "failed"});
  	}
  }); 
}

exports.handleRequest = function(projectId, testerId, option, callback){
 	 
	  var connection = connectDB();
	  
	 if(option == "approve"){
		 var query = "update tester_project set status = 'A', timestamp = NOW() where project_id ="+Number(projectId)+" and tester_id = "+Number(testerId);
	 }
	 else if(option == "reject"){
		 var query = "update tester_project set status = 'I', timestamp = NOW() where project_id ="+Number(projectId)+" and tester_id = "+Number(testerId);
	}
	 
connection.query(query, function (err, rows, fields) {
	console.log(rows);
	if(!err)
		callback({status : 200, data : "success"});
	else{
		console.log(err);
		callback({status : 400, data : "failed"});
	}
}); 
}

exports.getTestersByProject = function(projectId, callback){
	  
	  var testerData;
	  var connection = connectDB();
	  var query = "select pt.tester_id, first_name, last_name,reputation,DATE_FORMAT(DATE(timestamp),'%d-%b-%Y') as date from tester_project pt, tester t where t.tester_id = pt.tester_id and project_id = "+projectId;
	
connection.query(query, function (err, rows, fields) {
	console.log(rows);
	if(!err){
		testerData = rows;
		query = "select tester_id,count(*) as count from bugs where project_id ="+Number(projectId)+" group by tester_id"
		connection.query(query, function (err, count, fields) {			
			console.log(err);
            
			callback({status : 200, testerData : testerData, bugCount : count})
			
		})
		
	}
		//callback({status : 200, data : "success"});
	else{
		console.log(err);
		callback({status : 400, data : "failed"});
	}
}); 
}

exports.getBugsOfTester = function(testerId, projectId, callback){
 	 
	  var connection = connectDB();
	  
	var query = "select bug_id, bug_name, description from bugs where tester_id ="+Number(testerId)+" and project_id ="+Number(projectId);  
connection.query(query, function (err, rows, fields) {
	console.log(rows);
	if(!err)
		callback({status : 200, data : rows});
	else{
		console.log(err);
		callback({status : 400, data : "failed"});
	}
});
}
exports.getRecentBugs = function(projectId, callback){
	 
	  var connection = connectDB();
	  
	var query = "select  bug_id, bug_name, description from bugs where project_id ="+Number(projectId)+" order by timestamp desc limit 3"
connection.query(query, function (err, rows, fields) {
	console.log(rows);
	if(!err)
		callback({status : 200, data : rows});
	else{
		console.log(err);
		callback({status : 400, data : "failed"});
	}
}); 
}

exports.getBugsByProject = function(projectId, callback){
	 
	  var connection = connectDB();
	  
	var query = "select  bug_id,bugs.tester_id, steps_to_produce, first_name, last_name, bug_name, severity, timestamp, description, status, feedback from bugs,tester where bugs.tester_id = tester.tester_id and project_id ="+Number(projectId)+" order by severity desc"
connection.query(query, function (err, rows, fields) {
	console.log(rows);
	if(!err)
		callback({status : 200, data : rows});
	else{
		console.log(err);
		callback({status : 400, data : "failed"});
	}
}); 
}

exports.getBugsComments = function(bugId, callback){
	 
	 var connection = connectDB();
	  
	var query = "select *, DATE_FORMAT(timestamp,'%b %d %Y %h:%i %p') as timestamp from comments where  bug_id = "+bugId+" order by timestamp desc ";
connection.query(query, function (err, rows, fields) {
	console.log(rows);
	if(!err)
		callback({status : 200, data : rows});
	else{
		console.log(err);
		callback({status : 400, data : "failed"});
	}
}); 
}

exports.submitComment = function(bugId, comment, name, callback){
	 
	 var connection = connectDB();
	  
	var query = "insert into comments (bug_id, name, description,timestamp, role) values ("+bugId+", '"+name+"', '"+comment+"',NOW(),'client')";
	
	console.log(query);
connection.query(query, function (err, rows, fields) {
	console.log(rows);
	if(!err)
		callback({status : 200, data : rows});
	else{
		console.log(err);
		callback({status : 400, data : "failed"});
	}
}); 
}

exports.approveBug = function(bug, callback){
	 
	 var connection = connectDB();
	  console.log(bug);
	  
	  var update_bugs_query = "update bugs set status = 1, feedback = '"+bug.feedback+"', severity = '"+bug.bug.severity+"' where bug_id = "+bug.bug.bug_id;
	  var select_credits_query = "select reputation from tester where tester_id ="+bug.bug.tester_id;
	  
	  console.log(update_bugs_query);
	  console.log(select_credits_query);
	  
connection.query(update_bugs_query, function (err, rows, fields) {
	
		if(rows)
			connection.query(select_credits_query, function (err, rows, fields) {	
				
					average_rating = Math.ceil((rows[0].reputation + Number(bug.rating))/2);
					var update_tester_query = "update tester set reputation = "+average_rating+", credits = credits +"+Number(bug.credits)+" where tester_id = "+Number(bug.bug.tester_id);
					connection.query(update_tester_query, function (err, rows, fields) {	
						
							callback({statusCode : 200, message : "success"});
						
					});	
					
				});	
});
}

exports.rejectBug = function(bug, callback){
	 
	 var connection = connectDB();
	  console.log(bug);
	  
	  var update_bugs_query = "update bugs set status = 2, feedback = '"+bug.feedback+"', severity = '"+bug.bug.severity+"' where bug_id = "+bug.bug.bug_id;
	  var select_credits_query = "select reputation from tester where tester_id ="+bug.bug.tester_id;
	  
	  console.log(update_bugs_query);
	  console.log(select_credits_query);
	  
connection.query(update_bugs_query, function (err, rows, fields) {
	
		if(rows)
			connection.query(select_credits_query, function (err, rows, fields) {	
				
					average_rating = Math.ceil((rows[0].reputation + Number(bug.rating))/2);
					var update_tester_query = "update tester set reputation = "+average_rating+" where tester_id = "+Number(bug.bug.tester_id);
					connection.query(update_tester_query, function (err, rows, fields) {	
						
							callback({statusCode : 200, message : "success"});
						
					});	
					
				});	
});
}

exports.closeBug = function(bug, callback){
	 
	 var connection = connectDB();
	  console.log(bug);
	  
	  var update_bugs_query = "update bugs set status = 3, feedback = '"+bug.feedback+"', severity = '"+bug.bug.severity+"' where bug_id = "+bug.bug.bug_id;
	  var select_credits_query = "select reputation from tester where tester_id ="+bug.bug.tester_id;
	  
	  console.log(update_bugs_query);
	  console.log(select_credits_query);
	  
connection.query(update_bugs_query, function (err, rows, fields) {
	
		if(rows)
			callback({statusCode : 200, message : "Closed the bug"});
});
}
exports.validateClient = function(email, password,callback){
	 
	 var connection = connectDB();
	  
	  var query = "select * from client where email ='"+email+"' and password = '"+password+"'";
	  console.log(query);
	  
connection.query(query, function (err, rows, fields) {
	
		if(rows != undefined && rows.length > 0)
			callback({statusCode : 200, message : rows[0]});
		else
			callback({statusCode : 401, message : "Invalid login" });
});
}

exports.validateTester = function(email, password,callback){
	 
	 var connection = connectDB();
	  
	  var query = "select * from tester where email ='"+email+"' and password = '"+password+"'";
	  console.log(query);
	  
connection.query(query, function (err, rows, fields) {
	
		if(rows != undefined && rows.length > 0)
			callback({statusCode : 200, message : rows[0]});
		else
			callback({statusCode : 401, message : "Invalid login" });
});
}

exports.clientSignup = function(signUpData ,callback){
	 
	 var connection = connectDB();
	  
	  var query = "insert into client (first_name, last_name,email,password,organizaton_name,mobile) values('"+signUpData.firstname+"','"+signUpData.lastname+"','"+signUpData.email+"','"+signUpData.password+"','"+signUpData.organization+"',"+signUpData.contact+")";
	  console.log(query);
	  
connection.query(query, function (err, rows, fields) {
		
		console.log(err);
		if(rows != undefined && rows.length > 0)
			callback({statusCode : 200, message : rows[0]});
		else
			callback({statusCode : 401, message : "Invalid login" });
});
}

exports.testerSignup = function(signUpData ,callback){
	 
	 var connection = connectDB();
	  
	  var query = "insert into tester (first_name, last_name,email,password,mobile) values('"+signUpData.firstname+"','"+signUpData.lastname+"','"+signUpData.email+"','"+signUpData.password+"',"+signUpData.contact+")";
	  console.log(query);
	  
connection.query(query, function (err, rows, fields) {
		
		console.log(err);
		if(rows != undefined && rows.length > 0)
			callback({statusCode : 200, message : rows[0]});
		else
			callback({statusCode : 401, message : "Invalid login" });
});
}

exports.getBugsData = function(projectId ,callback){
	 
	 var connection = connectDB();
	  
	  var query = "select bug_id, status from bugs where project_id = "+projectId;
	  console.log(query);
	  
connection.query(query, function (err, rows, fields) {
		
		console.log(err);
		if(rows != undefined && rows.length > 0)
			callback({statusCode : 200, message : rows});
		else
			callback({statusCode : 401, message : "Invalid login" });
});
}

exports.createProject = function(clientId ,callback){
	 
	 var connection = connectDB();
	 var attributes = JSON.stringify({"TestType":"","product":"","platforms_selected" :[]});
	  var query = "Insert into project (client_id, project_attributes) values ("+clientId+",'"+attributes+"')";
	  console.log(query);
	  
connection.query(query, function (err, rows, fields) {
		
		projectId = rows.insertId;
		console.log(rows.insertId);
		console.log(err);
		if(rows)
			callback({statusCode : 200, message : projectId});
		else
			callback({statusCode : 401, message : "Invalid login" });
});
}
exports.getprojectstate=function(message,callback)
{
	var connection = connectDB();
	var query="select project_attributes from project where projectId="+message.projectId;
	console.log('Getting state query is ');
	console.log(query);
	connection.query(query, function (err, rows, fields) 
			{
		if(err)
			console.log(err);
		else
			callback(rows);
			});

};

//sreeram
exports.getbugsbycategory=function(tester_id,callback)
{
	var connection = connectDB();
	var query="select count(*) as count,status from bugs where tester_id="+tester_id+" group by status order by status";
	console.log('Getting bugs by category');
	console.log(query);
	connection.query(query, function (err, rows, fields) 
			{
	if(err)
		console.log(err);
	callback(rows);

});
};