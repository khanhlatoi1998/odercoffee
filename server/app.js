const express = require("express") ;
const app = express() ; 
const http = require("http") ; 
const server = http.createServer(app) ;
const socketio =  require("socket.io") ;
const io = socketio(server) ; 
const bodyParser = require("body-parser") ;  
const urlencodedParser = bodyParser.urlencoded({ extended: false }) ; 
const jsonParser = bodyParser.json() ;
const cookieParser = require('cookie-parser') ; 
const cors = require("cors") ;
const products = require("./Data.js") ;
const mongoose = require('mongoose');
	
const port = process.env.port || 3500 ; 

app.use(cookieParser()) ;
app.use(cors()) ;

mongoose.connect('mongodb://localhost:27017/userdata');
const Schema = mongoose.Schema;

const  dataUser1 = new Schema({
    items : Array ,
    store : String ,
    duration : Number ,
    username : String,
    password : String
}, {
	collection : "user", 
});

const DataUserModel = mongoose.model('user', dataUser1);

app.post("/signup", urlencodedParser, (req, res, next) => {
	const user = {
		items : [],
		store : "",
		duration : 0 ,
		username : req.body.username,
		password : req.body.password
	} ;
	DataUserModel.find({
		username : req.body.username, 
	}, (err, data) => {
		if(data.length > 0) {
			res.cookie("false", "false") ; 
			res.sendFile(__dirname + "/false.html") ;	
		}
		else {
			DataUserModel.create(user) ;
			res.sendFile(__dirname + "/index.html") ; 
			res.cookie("username", user.username) ;
			res.cookie("password", user.password) ;
		}
	}) ;
}) ;

app.get("/login", (req, res, next) => { 	 
	const user = {
		username : req.query.username,
		password : req.query.password
	} ; 
	DataUserModel.find({
		username : user.username, 
		password : user.password,
	}, (err, data) => {
		if(data.length > 0) { 	
			res.cookie("username", user.username) ;
			res.cookie("password", user.password) ;
			/* res.cookie("items", data[0].items) ; */
			res.sendFile(__dirname + "/index.html") ; 	
		}
		else {
			res.cookie("loginFalse", "false") ; 
			res.sendFile(__dirname + "/loginfalse.html") ;
		}
	}) ;
}) ; 

app.get("/products/:id", (req, res) => { 
	res.json(products[req.params.id]) ;  
}) ;

app.get("/products", (req, res) => {
	res.json(products) ;
}) ;

app.get("/dataUser", (req, res) => {
	DataUserModel.find({
		/* kieu kien hoac 1 trong 2
			$or : [
				{name : ""},
				{age : ""}
			]			
		*/
		/* age : { $in : [12, 43]}  lay age 12 hoac 43*/
		// name : /khanh/ lay name co khanh trong do 
		// age : { $gt : 20 } lay age lon hon 20
	})
		//skip(1) bo qua 1 element
		//limit(2) lay 2 phan tu
		//sort("age") sap xep theo age  
		.then((data) => {
			res.json(data) ; 
		})
		.catch((err) => {
			res.json(err) ; 
		}) ;
}) ;

app.post("/items", jsonParser, (req, res) => {
	DataUserModel.find({
		username : req.body.username
	})
		.then((data) => { 
			data[0].items.push(req.body.items) ;
	        for(let i = data[0].items.length - 2 ; i >= 0; i--) {
	            if(req.body.items.id === (data[0].items)[i].id) 
	                data[0].items.pop() ; 
	        }
			data[0].save() ; 
		})
		.catch((err) => {
			console.log(err + "err") ;  
		}) ;
}) ;

app.post("/valueItem", jsonParser, (req, res) => {
	DataUserModel.find({
		username : req.body.username
	}) 
		.then((data) => {
			data[0].items = req.body.items  ;
			data[0].save() ; 
		})
		.catch((err) => {
			return err ;
		}) ;
}) ;

app.post("/pay", jsonParser, (req, res) => {
	DataUserModel.find({
		username : req.body.username
	}) 
		.then((data) => {
			data[0].duration = req.body.duration  ;
			data[0].save() ; 
		})
		.catch((err) => {
			return err ;
		}) ;
}) ;

app.delete("/items", jsonParser, (req, res) => { 
	DataUserModel.find({
		username : req.body.username
	})
		.then((data) => { 
			let index = req.body.items.index ;
			(data[0].items)[index].value = 1 ; 
      		data[0].items.splice(index, 1) ;
      		data[0].save() ; 
	})
		.catch((err) => {
			console.log(err + "err") ;  
	}) ;
}) ; 

server.listen(port, () => { 
}) ; 