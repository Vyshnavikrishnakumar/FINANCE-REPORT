// import mongoose
var mongoose = require("mongoose");

// schema creation
var schema = mongoose.Schema({
	username:String,
	password:String
});

// model creation
var crudModel = mongoose.model("sample",schema);

// exporting
module.exports = crudModel;