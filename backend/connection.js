// importing mongoose
var mongoose = require("mongoose");

// connecting with db
mongoose.connect(
	"mongodb+srv://vishnu:vishnu@cluster0.hj3xm0s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
	).then(()=>{
		console.log("Connected to db");
	}).catch((err)=>{
		console.log(err);
	})