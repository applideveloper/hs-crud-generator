var fs = require('fs');
var prompt = require('prompt');
var changeCase = require('change-case');

prompt.start();
prompt.get(['model', 'project'], function (err, result) {
	var name 	= changeCase.lower(result.model);
	var project = result.project;
	var model 	= changeCase.upperCaseFirst(result.model);

	modelPath 		= "model/"+model+".js";
	controllerPath 	= "controllers/"+name+".js";
	appPath 		= "app.js";
	templatesPath 	= "templates/";

	fs.mkdir("model","0777", function(err){
    		//Creating Model

    		fs.readFile(templatesPath+"model.js", function (err, data) {
    			if (err) throw err;

    			data = data.toString();
    			data = data.replace(/<model>/g,changeCase.lower(model));
    			data = data.replace(/<Model>/g,model);
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
			});
		});
		  });
});
});