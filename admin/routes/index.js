const express = require('express')
const router = express.Router()
const session = require('express-session')
const nodemailer = require("nodemailer")
const bcrypt = require('bcrypt')
const saltRounds = 10

const Admin = require('../models/admin')
const Petugas = require('../models/petugas')
const Datakir = require('../models/datakir')

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

const transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use TLS
    auth: {
      user: "ekir.project@gmail.com",
      pass: "kelompokf"
    }
})

router.get('/petugas/edit/:id',checkSignIn,function(req,res){
    Petugas.findOne({_id:req.params.id},function(err,foundPetugas){
        if (err) {
            console.log(err)
        } else{
            petugas = JSON.stringify(foundPetugas)
            res.render('editPetugas',{petugas:petugas})
        }
    })
})

router.post('/petugas/edit/:id/save',checkSignIn,function(req,res){
    Petugas.updateOne({_id:req.params.id},req.body,function(err){
        if (err) {
            console.log(err)
        } else {
            req.flash('info', 'Berhasil mengedit data petugas');

            res.redirect(`/petugas/info/${req.params.id}`)
        }
    })
})
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