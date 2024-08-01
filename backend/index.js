var express = require("express");
var moment = require("moment-timezone");
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


function verifyToken(rawToken) {
	// Returns and object with user ID and admin status if valid or else empty {}
	var token = "";
	const emptyObj = {id:"", isAdmin:0};
	try {
		token = rawToken.replace("Bearer ","");
	} catch {
		return emptyObj;
	}
	if (token) {
		try {
			const id = jwt.verify(token, tokenSecret);
			return id;
		}
		catch {
			return emptyObj;
		}
	}
	else {
		return emptyObj;
	}
}


app.use( ( req, res, next ) => {
	req.session = req.universalCookies.get("session");
	next();
});


//*** USER ***
app.get("/api/validateLogin", async (req, res) => {
	const userID = verifyToken(req.headers.authorization)["id"];
	if (userID === "") {
		res.status(401).send("Access Denied!");
	}
	else {
		res.send("OK");
	}
});

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
		res.status(401).send("Please fill out all fields!");
	}
	else if (userData && userData.blocked === 1) {
		res.status(401).send("Account blocked!. Contact admin");
	}
	else if (userData && userData.password === password) {
		await UserModel.findByIdAndUpdate(userData._id,{lastlogin:moment.tz(new Date().toUTCString(), "Asia/Kolkata").toLocaleString()});
		const token = jwt.sign({ id: userData._id, isAdmin: 0 }, tokenSecret);
		res.send({ token });
	} else {
		res.status(401).send('Invalid login credentials');
	}
});

app.get("/api/dashboard", async (req, res) => {
	const userID = verifyToken(req.headers.authorization)["id"];
	if (userID === "") {
		res.status(401).send("Access Denied!")
	}
	else {
		//goutham - Fetch data for user dashboard
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
	userID = verifyToken(req.headers.authorization)["id"];
	isAdmin = verifyToken(req.headers.authorization)["isAdmin"];
	if (userID === "" || isAdmin === 0) {
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
	userID = verifyToken(req.headers.authorization)["id"];
	isAdmin = verifyToken(req.headers.authorization)["isAdmin"];
	if (userID === "" || isAdmin === 0) {
		res.status(401).send("Access Denied!")
	}
	else {
		try {
			var id = req.params.id;
			await UserModel.findByIdAndDelete(id);
			res.send({message:"user deleted"});
		} catch (error) {
			console.error(error);
		}
	}
});

app.post("/api/admin/blockUser/:id",async(req,res)=>{
	userID = verifyToken(req.body.data.token)["id"];
	isAdmin = verifyToken(req.body.data.token)["isAdmin"];
	if (userID === "" || isAdmin === 0) {
		res.status(401).send("Access Denied!")
	}
	else {
		try {
			var id = req.params.id;
			var blockStatus = req.body.data.blockStatus;
			if (blockStatus === 0) {
				blockStatus = 1;
			}
			else {
				blockStatus = 0;
			}
			await UserModel.findByIdAndUpdate(id,{blocked:blockStatus});
			res.send({message:"user updated"});
		} catch (error) {
			console.error(error);
		}
	}
});

app.listen("3000", () => {
	console.log("Port is up and running!");
});
