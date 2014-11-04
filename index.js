var fs = require('fs');
var prompt = require('prompt');
var changeCase = require('change-case');

prompt.start();
prompt.get(['model'], function (err, result) {
    var name = result.model;
    var model = result.model;
    model = changeCase.upperCaseFirst(model);
    modelPath = "model/"+model+".js";
    templatesPath = "templates/";
    fs.mkdir("model","0777", function(err){
	fs.open(modelPath, "ax", function(err,fd)
	{
		if (err) throw err;
		console.log(fd);
	});
	fs.readFile(templatesPath+"model.js", function (err, data) {
	  if (err) throw err;
	  console.log(data.constructor.name);
	  data = data.toString();
	  data = data.replace(/<model>/g,changeCase.lower(model));
	  data = data.replace(/<Model>/g,model);
	  fs.appendFile(modelPath, data, function (err) {
		if (err) throw err;
	  	console.log('The "data to append" was appended to file!');
	});
	});
});
  });


	//fs.writeFile	