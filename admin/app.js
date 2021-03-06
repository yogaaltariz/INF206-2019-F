const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const flash = require('express-flash')

const app = express()

app.use(express.static(__dirname+'/assets'));
app.use(express.static(__dirname+'/css'));
app.use(express.static(__dirname+'/js'));
//set view engine menggunakan ejs
app.set("view engine","ejs")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
	secret: "This is my secret", //save it to dotenv
	resave: false,
	saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

mongoose.connect("mongodb://localhost:27017/ekir",{useNewUrlParser: true})


app.use('/', require('./routes/index.js'));
// app.use('/users', require('./routes/users.js'));

app.use('/', function(err, req, res, next){
	console.log(err);
	   //User should be authenticated! Redirect him to log in.
	   res.redirect('/login');
});


// localhost:3000
app.listen(4000, function () {
	console.log('Server started on port 4000')
})