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
router.post('/addPetugas',function(req,res){
	const password = Math.random().toString(36).substring(7);
	bcrypt.hash(password,saltRounds,function(err,hash){
		 const petugas = new Petugas({
			  NIP: req.body.NIP,
			  nama: req.body.nama,
			  jk: req.body.jk,
			  alamat: req.body.alamat,
			  email: req.body.email,
			  username: req.body.username,
			  password: hash
		 })
		 petugas.save(function (err){
			  if(err){
					console.log(err)
			  } else {
					let message = {
						 from: 'Ekir Project',
						 to: req.body.email,
						 subject: 'Daftar akun',
						 text: `Selamat bergabung ${req.body.nama}, password akun anda : ${password}`
					}
	
					transporter.sendMail(message,function(err){
						 if(err){
							  console.log(err)
						 } else{
							  req.flash('info', 'Berhasil menambah petugas');
							  res.redirect('/petugas')
						 }
					})
			  }
		 })
	})
})