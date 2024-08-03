// model.js

// import mongoose
var mongoose = require("mongoose");

// schema creation
var userSchema = mongoose.Schema({
	name: String,
	phoneNumber: String,
	email: String,
	username: String,
	password: String,
	blocked: Number,
	lastlogin: {type:String, default:"Not logged in"},
	data: {type:Array, default:[],}
});

// admin schema creation
var adminSchema = mongoose.Schema({
	username: String,
	password: String
});

// model creation
var UserModel = mongoose.model("User", userSchema);
var AdminModel = mongoose.model("Admin", adminSchema);

// exporting
module.exports = { UserModel, AdminModel };
