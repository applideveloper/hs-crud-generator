var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');

var <model>Schema = new mongoose.Schema({
	<properties>
});
module.exports = mongoose.model('<Model>', <model>Schema);