var <Model> = require('../models/<Model>');
var express = require('express'),
    expressValidator = require('express-validator');


var app = express();

exports.index = function(req, res) {
		<Model>.find(function(err,<model>s){
		res.render('<model>/index', {
    	title: '<project>',
    	<model>s : <model>s
  });
	});
};

exports.new = function(req, res) {
		res.render('<model>/create', {
    	title: ' New | <project>',
  });
};

exports.create = function(req, res) {
//var ntitle = req.body.title;
//var ndesc = req.param('desc');
// Get other varialbes 
	var <model> = new <Model>({
		//title: ntitle,
		//desc: ndesc,
		<createModelProp>
    //set other Variables
  });
	<model>.save();
	res.redirect('/<model>/');
};

exports.show = function(req, res) {
	var id = req.params.id;
  <Model>.findOne({_id:id},function(err,<model>){
  		res.render('<model>/view', {
    	title: '<project>',
    	<model> : <model>,
  		});	
	});
};

exports.edit = function(req, res) {
  var id = req.params.id;
  <Model>.findOne({_id:id},function(err,<model>){
          res.render('<model>/edit', {
            title: '<project>',
            <model> : <model>,
      });   
  });
};

exports.update = function(req, res) {
  // var ntitle = req.body.title;
  // var ndesc = req.param('desc');
  <Model>.findOne({_id:req.params.id},function(err,<model>){
    // model.title = ntitle,
    // model.desc = ndesc,
    <updateModelProp>
    <model>.save();
  });

  res.redirect('/<model>/'+req.params.id);
};

exports.destroy = function(req, res) {

};