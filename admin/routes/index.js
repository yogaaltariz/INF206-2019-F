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

//function
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

router.get('/',checkSignIn,function(req,res){
    Datakir.find({}).sort({tanggalPeriksa : 'descending'}).exec(function(err,data){
        if (err) {
            console.log(err)
        } else {
            let dataDB = JSON.stringify(data)

            res.render('index',{data: dataDB})
        }
    })
    
})

router.get('/petugas',checkSignIn,function(req,res){
    Petugas.find(function(err,data){
        if (err) {
            console.log(err)
        } else {
            const petugas = JSON.stringify(data)
            res.render('petugas',{petugas: petugas})
        }
    })
})

router.get('/petugasJSON',function(req,res){
    Petugas.find(function(err,data){
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    })
})

//menambahkan function untuk add petugas
router.get('/addPetugas',checkSignIn,function(req,res){
    res.render('addPetugas')
})
//menambahkan function untuk login
router.get('/login',function(req,res){
    res.render('login')
})
//menambahkan function untuk logout
router.get('/logout',function(req,res){
    req.session.destroy(function(){
        console.log("user logged out.")
     });
     
     res.redirect('/login');
})

router.get('/petugas/info/:id',checkSignIn,function(req,res){
    Petugas.findOne({_id: req.params.id},function(err,foundPetugas){
        Datakir.find({idPetugas: foundPetugas._id},function(err,foundData){
            // dataPetugas = JSON.stringify(foundPetugas)
            // dataKapal = JSON.stringify(foundData)
            const kapalLulus = foundData.filter(function (item){
                return item.hasil
            })

            const kapalTidakLulus = foundData.filter(function (item){
                return !(item.hasil)
            })
            const num = foundData.length
            const petugas= JSON.stringify(foundPetugas)

            res.render('infoPetugas',{id: foundPetugas._id,petugas:petugas,jumlah:num,kapalLulus:kapalLulus.length,kapalTidakLulus:kapalTidakLulus.length})
        })
    })
    // res.render('infoPetugas')
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
//fungsi untuk mengreset password petugas 
router.get('/petugas/resetPassword/:id',checkSignIn,(req,res)=>{
    const password = Math.random().toString(36).substring(7);
    bcrypt.hash(password,saltRounds,(err,hash)=>{
        Petugas.findOneAndUpdate({_id:req.params.id},{password:hash},function(err,foundPetugas){
            if (err) {
                console.log(err)
            } else {
                let message = {
                    from: 'Ekir Project',
                    to: foundPetugas.email,
                    subject: 'Reset Password',
                    text: `Password baru akun anda : ${password}`
                }
    
                transporter.sendMail(message,function(err){
                    if(err){
                        console.log(err)
                    } else{
                        req.flash('info', 'Reset password berhasil');
                        res.redirect(`/petugas/info/${req.params.id}`)
                    }
                })
            }
        })
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

router.get("/info/:id",checkSignIn,function(req,res,next) {
	Datakir.findOne({_id: req.params.id}, function (err,data){
		if (err) {
			res.send(err)
		} else {
			const kapal = JSON.stringify(data)
			res.render('info.ejs',{kapal:kapal})
		}
	})
})



module.exports = router;