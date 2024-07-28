// index.js

var express = require("express");
require("./connection");
var { UserModel, AdminModel } = require("./model");
const jwt = require('jsonwebtoken');
const cookiesMiddleware = require('universal-cookie-express');
const cors = require('cors');

var app = express();
app.use(express.json());
app.use(cookiesMiddleware());
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Add CORS middleware

// Rest of your code...




// var express = require("express");
// require("./connection");
// var sampleModel = require("./model");
// const jwt = require('jsonwebtoken');
// const cookiesMiddleware = require( 'universal-cookie-express' )

// var app = express();
// app.use(express.json());
// app.use(cookiesMiddleware());

// api
app.use( ( req, res, next ) => {
    req.session = req.universalCookies.get('session')
    next()
})

app.post("/api/verify",async(req,res)=>{
	const sessionID = req.session;
	console.log(sessionID);
})

app.post("/api/signup",async(req,res)=>{
	try {
		await UserModel(req.body).save();
		res.send("User Created");
	} catch (error) {
		console.log(error);
	}
});

// User sign-in
app.post("/api/signin", async (req, res) => {
  const { username, password } = req.body;
  const userData = await UserModel.findOne({ username });
  if (userData && userData.password === password) {
    const token = jwt.sign({ id: userData._id }, 'hd8weh38dsh8sdJJ9asn==');
    res.send({ token });
  } else {
    res.status(401).send('Invalid login credentials');
  }
});

// Admin sign-in
app.post("/api/admin/signin", async (req, res) => {
  const { username, password } = req.body;
  const adminData = await AdminModel.findOne({ username });
  if (adminData && adminData.password === password) {
    const token = jwt.sign({ id: adminData._id }, 'hd8weh38dsh8sdJJ9asn==');
    res.send({ token });
  } else {
    res.status(401).send('Invalid login credentials');
  }
});

// Verify session
app.post("/api/verify", async (req, res) => {
  const sessionID = req.session;
  console.log(sessionID);
});

app.listen("3000", () => {
  console.log("Port is up and running!");
});
