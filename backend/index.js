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

app.post("/api/addRecord", async (req, res) => {
	const userID = verifyToken(req.headers.authorization)["id"];
	if (userID === "") {
		res.status(401).send("Access Denied!");
	}
	else {
		const amount = req.body.income;
		const chk = Math.trunc(amount);
		var body = req.body;
		if (chk%1 === 0) {
			if (chk === 0) {
				res.status(401).send("Amount is zero!");
			}
			const _id = userID;
			const userData = await UserModel.findOne({ _id });
			var cache = await userData.data;
			body.income = parseFloat(body.income);
			cache.unshift(body);
			for (i=0;i<cache.length;i++) {
				cache[i].index = i;
			}
			await UserModel.findByIdAndUpdate(_id,{data:cache});
			res.send("Record added");
		}
		else {
			res.status(401).send("Please enter valid amount!")
		}
	}
});

app.delete("/api/deleteRecord/:index",async(req,res)=>{
	const userID = verifyToken(req.headers.authorization)["id"];
	if (userID === "") {
		res.status(401).send("Access Denied!");
	}
	else {
		const _id = userID;
		var index = req.params.index;
		const userData = await UserModel.findOne({ _id });
		var cache = userData.data;
		cache.splice(index,1);
		for (i=0;i<cache.length;i++) {
			cache[i].index = i;
		}
		await UserModel.findByIdAndUpdate(_id,{data:cache});
		res.send("Record deleted");
	}
});

app.get("/api/dashboard", async (req, res) => {
	const userID = verifyToken(req.headers.authorization)["id"];
	if (userID === "") {
		res.status(401).send("Access Denied!")
	}
	else {
		const _id = userID;
		const userData = await UserModel.findOne({ _id });
		const data = userData.data;
		var response = {
			balance:0,
			spent:0,
			credits:0,
			debits:0
		};
		for (i=0;i<data.length;i++) {
			item = data[i]
			if (item.type === 'credit') {
				response.credits++;
				response.balance = response.balance + item.income;
			}
			else {
				response.debits++;
				response.balance = response.balance - item.income;
				response.spent = response.spent + item.income;
			}
		}
		res.send({records:userData.data, total:response});
	}
});

app.get("/api/getName", async (req, res) => {
	const userID = verifyToken(req.headers.authorization)["id"];
	if (userID === "") {
		res.status(401).send("Access Denied!")
	}
	else {
		const _id = userID;
		const userData = await UserModel.findOne({ _id });
		const name = userData.name;
		res.send({name});
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

app.post("/api/admin/switchUser", async (req, res) => {
	userID = req.body.data.id;
	isAdmin = verifyToken(req.body.data.token)["isAdmin"];
	if (userID === "" || isAdmin === 0) {
		res.status(401).send("Access Denied!")
	}
	else {
		const token = jwt.sign({ id: userID, isAdmin: 1 }, tokenSecret);
		res.send({ token });
	}
});

app.listen("3000", () => {
	console.log("Port is up and running!");
});
