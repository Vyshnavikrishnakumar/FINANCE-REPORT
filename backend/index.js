var express = require("express");
require("./connection");
var sampleModel = require("./model");
const jwt = require('jsonwebtoken');
const cookiesMiddleware = require( 'universal-cookie-express' )

var app = express();
app.use(express.json());
app.use(cookiesMiddleware());

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
		await sampleModel(req.body).save();
		res.send("User Created");
	} catch (error) {
		console.log(error);
	}
});

app.post("/api/signin",async(req,res)=>{
	const {username,password} = req.body;
	const userData = await sampleModel.findOne({username});
	if (userData && userData.password === password) {
		const token = jwt.sign({id: userData._id}, 'hd8weh38dsh8sdJJ9asn==');
		res.send({token});
	} else {
		res.status(401).send('Invalid login credentials');
	  }
});

app.listen("3000", ()=>{
	console.log("Port is up and running!");
});