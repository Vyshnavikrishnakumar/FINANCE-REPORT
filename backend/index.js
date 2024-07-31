var express = require("express");
require("./connection");
var { UserModel, AdminModel } = require("./model");
const jwt = require("jsonwebtoken");
const cookiesMiddleware = require("universal-cookie-express");
const cors = require('cors');

const tokenSecret = "hd8weh38dsh8sdJJ9asn==";

var app = express();
app.use(express.json());
app.use(cookiesMiddleware());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


function verifyToken(token) {
	// Returns and object with user ID and admin status if valid or else empty string
	if (token) {
		try {
			const id = jwt.verify(token, tokenSecret);
			return id;
		}
		catch {
			return "";
		}
	}
	else {
		return ""
	}
}


app.use( ( req, res, next ) => {
		req.session = req.universalCookies.get("session");
		next();
});


//*** USER ***
app.post("/api/signup",async(req,res)=>{
	try {
		const { username,password } = req.body;
		const userData = await UserModel.findOne({ username });
		if (username.trim() === "" || password.trim() === ""){
			res.status(401).send("Please fill all the field(s)!");
		}
		else if((userData && userData.username === username) || username.toLowerCase() == "admin") {
			res.status(401).send("User already exists!");
		}
		else {
			await UserModel(req.body).save();
			res.send("User Created");
		}
	} catch (error) {
		console.log(error);
	}
});

app.post("/api/signin", async (req, res) => {
	const { username, password } = req.body;
	const userData = await UserModel.findOne({ username });
	if (username.trim() === "" || password.trim() === ""){
		res.status(401).send("Please fill all the field(s)!");
	}
	else if (userData && userData.password === password) {
		const token = jwt.sign({ id: userData._id, isAdmin: 0 }, tokenSecret);
		res.send({ token });
	} else {
		res.status(401).send('Invalid login credentials');
	}
});

app.get("/api/dashboard", async (req, res) => {
	const token = req.headers.authorization.replace("Bearer ","");
	const userID = verifyToken(token)["id"];
	if (userID === "") {
		res.status(401).send("Access Denied!")
	}
	else {
		const userData = await UserModel.findOne({ userID });
	}
});


//*** ADMIN ***
app.post("/api/admin/signin", async (req, res) => {
	const { username, password } = req.body;
	const adminData = await AdminModel.findOne({ username });
	if (username.trim() === "" || password.trim() === ""){
		res.status(401).send("Please fill all the field(s)!");
	}
	else if (adminData && adminData.password === password) {
		const token = jwt.sign({ id: adminData._id, isAdmin: 1 }, tokenSecret);
		res.send({ token });
	} else {
		res.status(401).send('Invalid login credentials');
	}
});

app.get("/api/admin/getUserList", async (req, res) => {
	var token = "";
	try {
		token = req.headers.authorization.replace("Bearer ","");
	} catch (error) {
		console.log("No bearer token!");
	}
	userID = verifyToken(token)["id"];
	isAdmin = verifyToken(token)["isAdmin"];
	if (token === "" || userID === "" || isAdmin === 0) {
		res.status(401).send("Access Denied!")
	}
	else {
		try {
			var output = await UserModel.find({}, {password:0});
			res.send(output);
		} catch (error) {
			console.error(error);
		}
	}
});

app.delete("/api/admin/deleteUser/:id",async(req,res)=>{
	try {
		var id = req.params.id;
		await UserModel.findByIdAndDelete(id);
		res.send({message:"data deleted"});
	} catch (error) {
		console.error(error);
	}
});

app.listen("3000", () => {
	console.log("Port is up and running!");
});
