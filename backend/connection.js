// importing mongoose
var mongoose = require("mongoose");

// connecting with db
mongoose.connect(
	"mongodb+srv://gouthamsanthoshxyz:gouthamsanthosh@cluster0.fahnduf.mongodb.net/finance?retryWrites=true&w=majority&appName=Cluster0"
	).then(()=>{
		console.log("Connected to db");
	}).catch((err)=>{
		console.log(err);
	})