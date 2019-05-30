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

const express = require('express')
const router = express.Router()
const session = require('express-session')
const nodemailer = require("nodemailer")
const bcrypt = require('bcrypt')
const saltRounds = 10

const Admin = require('../models/admin')
const Petugas = require('../models/petugas')
const Datakir = require('../models/datakir')


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

router.get('/login',function(req,res){
    res.render('login')
})

router.get('/logout',function(req,res){
    req.session.destroy(function(){
        console.log("user logged out.")
     });
     
     res.redirect('/login');
})
router.post('/login',function(req,res){
    const username = req.body.username
    const password = req.body.password
    // console.log(req.body)
    Admin.findOne({username: username},function(err,foundUser){
        if (err) {
            console.log(err)
        } else {
            if (foundUser) {
                if (foundUser.password === password) {
                    req.session.user = foundUser
                    res.redirect('/')
                } else {
                    req.flash('info', 'Username atau password salah');
                    res.render('login')
                }
            } else {
                req.flash('info', 'Username atau password salah');
                res.render('login')
            }
        }
    })
})