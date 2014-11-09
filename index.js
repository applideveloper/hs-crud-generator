var fs = require('fs');
var prompt = require('prompt');
var changeCase = require('change-case');


prompt.start();
prompt.get(['model', 'project'], function (err, result) {
	var name 	= changeCase.lower(result.model);
	var project = result.project;
	var model 	= changeCase.upperCaseFirst(result.model);
	var args 	= process.argv.slice(2);
	var modelProp = false;
	if(args[0] != null)
	{ 
		var properties = JSON.stringify(eval("({" + args[0] + "})"));
		properties = JSON.parse(properties);

		//Making Model String 
		var modelString="";
		for(var attributename in properties){
			modelString = modelString+ attributename+": "+properties[attributename]+",\n\t";
		}

		//Making CreateRoute Model Properties
		var createModelProp = "";
		for(var attributename in properties){
			createModelProp = createModelProp+ attributename+": req.param('"+attributename+"'),\n\t";
		}

		//Update Route Properties

		var updateModelProp = "";
		for(var attributename in properties){
			updateModelProp = updateModelProp+ name+"."+attributename+": req.param('"+attributename+"'),\n\t";
		}	
		modelProp = true;
	}
	else
	{
		console.log("Model Arguments not Given");
		modelProp = false;
	}
	

	modelPath 		= "models/"+model+".js";
	controllerPath 	= "controllers/"+name+".js";
	appPath 		= "app.js";
	templatesPath 	= "templates/";
	viewsPath		= "views/"

	fs.mkdir("models","0777", function(err){
    		//Creating Model

    		fs.readFile(templatesPath+"model.js", function (err, data) {
    			if (err) throw err;

    			data = data.toString();
    			data = data.replace(/<model>/g,changeCase.lower(model));
    			data = data.replace(/<Model>/g,model);
    			if(modelProp)
    			{
    				data = data.replace(/<properties>/g,modelString);	
    			}
    			
    			fs.appendFile(modelPath, data, function (err) {
    				if (err) throw err;
    				console.log(model+' Model is Created');
    			});	

		  	//Creating Controller With CRUD Methods

		  	fs.readFile(templatesPath+"controller.js", function (err, data) {
		  		if (err) throw err;

		  		data = data.toString();
		  		data = data.replace(/<model>/g,changeCase.lower(model));
		  		data = data.replace(/<Model>/g,model);
		  		data = data.replace(/<project>/g,project);
		  		if(modelProp)
		  		{
		  			data = data.replace(/<createModelProp>/g,createModelProp);
		  			data = data.replace(/<updateModelProp>/g,updateModelProp);	
		  		}
		  		fs.appendFile(controllerPath, data, function (err) {
		  			if (err) throw err;
		  			console.log(model +' Controller is Created');
		  		});

			// Creating Paths for CRUD Controller to be used in app.js

			fs.readFile(templatesPath+"paths.js", function (err, data) {
				if (err) throw err;

				data = data.toString();
				data = data.replace(/<model>/g,changeCase.lower(model));
				data = data.replace(/<Model>/g,model);
				data = data.replace(/<project>/g,project);
				fs.appendFile(appPath, data, function (err) {
					if (err) throw err;
					console.log(model +' Paths for app.js are created');
				});

				//Template Files

				fs.mkdir(viewsPath+name,"0777",function(err){
					if (err) throw err;

					fs.readFile(templatesPath+"view.js",function(err,data){
						if (err) throw err;
						fs.appendFile(viewsPath+name+"/create.jade",data,function(err){
							if (err) throw err;
						}); //index,create,view,edit
						fs.appendFile(viewsPath+name+"/index.jade",data,function(err){
							if (err) throw err;
						});
						fs.appendFile(viewsPath+name+"/view.jade",data,function(err){
							if (err) throw err;
						});
						fs.appendFile(viewsPath+name+"/edit.jade",data,function(err){
							if (err) throw err;
						});
						console.log("Generated View Files");
					});
				});

			});
		});
	});
});
});