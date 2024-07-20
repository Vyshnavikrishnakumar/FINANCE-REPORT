var express = require("express");
require("./connection");
var sampleModel = require("./model");

var app = express();
app.use(express.json());

// api
// async - wait for data to save
app.post("/api/signup",async(req,res)=>{
	try {
		await sampleModel(req.body).save();
		res.send("User Created");
	} catch (error) {
		console.log(error);
	}
});

app.listen("3000", ()=>{
	console.log("Port is up and running!");
});