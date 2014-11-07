var fs = require('fs');
var prompt = require('prompt');
var changeCase = require('change-case');

prompt.start();
console.log("1.Generate Model");
console.log("2.Generate Rest of Files");
console.log("Select an Option");
prompt.get(['option'],function (err,result){
if (result.option == "1")
{
	genModel();
}
else if(result.option == "2")
{
	genRest();
}
else
{
	console.log("Enter 1 or 2 ");
}

});

function genModel()
{
	prompt.get(['model'],function (err,result){
		var model 	= changeCase.upperCaseFirst(result.model);
		modelPath 		= "model/"+model+".js";
		fs.readFile(templatesPath+"model.js", function (err, data) {
			if (err) throw err;

			data = data.toString();
			data = data.replace(/<model>/g,changeCase.lower(model));
			data = data.replace(/<Model>/g,model);
			fs.appendFile(modelPath, data, function (err) {
				if (err) throw err;
				console.log(model+' Model is Created . Edit the model and Generate Rest of the Files .');
			});	
    	});
	});
}
function genRest()
{
	console.log("Input an Exisiting Model");
	prompt.get(['model', 'project'], function (err, result) {
		var name 	= changeCase.lower(result.model);
		var project = result.project;
		var model 	= changeCase.upperCaseFirst(result.model);

		modelPath 		= "model/"+model+".js";
		controllerPath 	= "controllers/"+name+".js";
		appPath 		= "app.js";
		templatesPath 	= "templates/";
		viewsPath		= "views/"

		// fs.mkdir("model","0777", function(err){
    		//Creating Model

    		// fs.readFile(templatesPath+"model.js", function (err, data) {
    		// 	if (err) throw err;

    		// 	data = data.toString();
    		// 	data = data.replace(/<model>/g,changeCase.lower(model));
    		// 	data = data.replace(/<Model>/g,model);
    		// 	fs.appendFile(modelPath, data, function (err) {
    		// 		if (err) throw err;
    		// 		console.log(model+' Model is Created');
    		// 	});	

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

						//Template Files

						fs.mkdir(viewsPath+model,"0777",function(err){
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
			// });
		// });
	});
}
