// model.js

// import mongoose
var mongoose = require("mongoose");

// schema creation
var userSchema = mongoose.Schema({
  username: String,
  password: String,
  blocked: Number,
  lastlogin: {type:String, default:"Not logged in"}
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
