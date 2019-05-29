function checkSignIn(req, res,next){
	if(req.session.user){
	   next()     //If session exists, proceed to page
	} else {
	   const err = new Error("Not logged in!")
       console.log(req.session.user)
       req.flash('info', 'Login terlebih dahulu');
	   next(err) //Error, trying to access unauthorized page!
	}
}