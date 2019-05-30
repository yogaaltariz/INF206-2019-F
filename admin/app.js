















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