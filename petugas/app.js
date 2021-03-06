require('dotenv').config()
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const flash = require('express-flash')
const saltRounds = 10

const app = express()
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));

//set view engine menggunakan ejs
app.set("view engine","ejs")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(flash())
app.use(express.static(__dirname+'/image'));
app.use(express.static(__dirname+'/style'));
app.use(express.static(__dirname+'/views'));
app.use(express.static(__dirname+'/js'));


//buat koneksi ke local database
mongoose.connect('mongodb://localhost:27017/ekir',{ useNewUrlParser: true})

// Schema data
const ekirSchema = new mongoose.Schema({
	namaKapal: {
		type : String,
		required: [true,'masukkan nama kapal']
	},
	bendera: {
		type : String,
		required : [true,'masukkan bendera']
	},
	grossTon: {
		type : Number,
		required : [true,'masukkan gross ton kapal']
	},
	namaNakhoda: {
		type: String,
		required: [true,'masukkan nama nakhoda']
	},
	IMO: {
		type: String,
		required: [true,'masukkan IMO number']
	},
	JumlahABK: {
		type: Number,
		required: [true,'masukkan jumlah anak buah kapal']
	},
	callSign: {
		type: String,
		required: [true,'masukkan call sign kapal']
	},
	tahunPembuatan: {
		type: Number,
		required: [true,'masukkan tahun pembuatan kapal']
	},
	jenisKapal: {
		type: String,
		required: [true,'masukkan jenis kapal']
	},
	pemilik: {
		type: String,
		required: [true,'masukkan pemilik kapal']
	},
	peralatanNavigasi: {
		type: String,
		required: [true,'terdapat data yang kosong']
	},
	peralatanNavigasiket: {
		type: String,
		required: function() { return this.peralatanNavigasi === 'Tidak sesuai persyaratan'; }
	},
	peralatanRadio: {
		type: String,
		required: [true,'terdapat data yang kosong']
	},
	peralatanRadioket: {
		type: String,
		required: function() { return this.peralatanRadio === 'Tidak sesuai persyaratan'; }
	},
	alatKeselamatan: {
		type: String,
		required: [true,'terdapat data yang kosong']
	},
	alatKeselamatanket: {
		type: String,
		required : function() { return this.alatKeselamatanket === 'Tidak sesuai persyaratan'; }
	},
	alatPemadam: {
		type: String,
		required: [true,'terdapat data yang kosong']
	},
	alatPemadamket: {
		type: String,
		required : function() { return this.alatPemadam === 'Tidak sesuai persyaratan'; }
	},
	pintuBukaan: {
		type: String,
		required: [true,'terdapat data yang kosong']
	},
	pintuBukaanket: {
		type: String,
		required : function() { return this.pintuBukaan === 'Tidak sesuai persyaratan'; }
	},
	mesinListrik: {
		type: String,
		required: [true,'terdapat data yang kosong']
	},
	mesinListrikket: {
		type: String,
		required : function() { return this.mesinListrik === 'Tidak sesuai persyaratan'; }
	},
	alatPencegah: {
		type: String,
		required: [true,'terdapat data yang kosong']
	},
	alatPencegahket: {
		type: String,
		required : function() { return this.alatPencegah === 'Tidak sesuai persyaratan'; }
	},
	nakhoda: {
		type: String,
		required: [true,'terdapat data yang kosong']
	},
	nakhodaket: {
		type: String,
		required : function() { return this.nakhoda === 'Tidak sesuai persyaratan'; }
	},
	jumlahPerwira: {
		type: String,
		required: [true,'terdapat data yang kosong']
	},
	jumlahPerwiraket: {
		type: String,
		required : function() { return this.jumlahPerwira === 'Tidak sesuai persyaratan'; }
	},
	jumlahABK: {
		type: String,
		required: [true,'terdapat data yang kosong']
	},
	jumlahABKket: {
		type: String,
		required : function() { return this.jumlahABK === 'Tidak sesuai persyaratan'; }
	},
	jenisAlatTangkap: {
		type: String,
		required: [true,'terdapat data yang kosong']
	},
	jenisAlatTangkapket : {
		type: String,
		required : function() { return this.jenisAlatTangkap === 'Tidak sesuai persyaratan'; }
	},
	jumlahAPI: {
		type: String,
		required: [true,'terdapat data yang kosong']
	},
	jumlahAPIket: {
		type: String,
		required : function() { return this.jumlahAPI === 'Tidak sesuai persyaratan'; }
	},
	jumlahABPI: {
		type: String,
		required: [true,'terdapat data yang kosong']
	},
	jumlahABPIket: {
		type: String,
		required : function() { return this.jumlahABPI === 'Tidak sesuai persyaratan'; }
	},
	spekAPI: {
		type: String,
		required: [true,'terdapat data yang kosong']
	},
	spekAPIket: {
		type: String,
		required : function() { return this.spekAPI === 'Tidak sesuai persyaratan'; }
	},
	spekABPI: {
		type: String,
		required: [true,'terdapat data yang kosong']
	},
	spekABPIket: {
		type: String,
		required : function() { return this.spekABPI === 'Tidak sesuai persyaratan'; }
	},
	palkah: {
		type: String,
		required: [true,'terdapat data yang kosong']
	},
	palkahket: {
		type: String,
		required : function() { return this.palkah === 'Tidak sesuai persyaratan'; }
	},
	tanggalPeriksa: {
		type: Date,
		required: [true,'tidak dapat simpan tanggal']
	},
	hasil: {
		type: Boolean,
		required: [true,'tidak dapat mengkalkulasi hasil']
	},
	idPetugas: {
		type: String,
		required: [true,'tidak ada id admin']
	},
	namaPetugas: {
		type: String,
		required: [true,'tidak ada nama petugas']
	}
})

petugasSchema = new mongoose.Schema({
	username : String,
    password : String,
    nama : String
})

const DataKir = mongoose.model("DataKir",ekirSchema)
const petugas = mongoose.model("petugas",petugasSchema)

/**
 * function checkSignIn untuk mengecek user sudah berhasil login 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const checkSignIn = (req, res,next) => { 
	if(req.session.user){
	   next()     //If session exists, proceed to page
	} else {
	   const err = new Error("Not logged in!")
	   console.log(req.session.user)
	   next(err) //Error, trying to access unauthorized page!
	}
}


/**
 * fungsi untuk render halaman home
 */
app.get('/',checkSignIn,(req, res,next) => {
	petugas.findOne({_id : req.session.user._id}, function(err,data){
		if (err) {
			console.log(err)
		} else {
			// const user = JSON.stringify(data)
			DataKir.find({idPetugas: req.session.user._id}, function(err,foundData){
				if(err) {
					console.log(err)
				} else {
					const dataHariIni = foundData.filter(function (item){
						const day = new Date(item.tanggalPeriksa)
						const today = new Date()
						if (day.getDate() === today.getDate()) {
							return item
						}
					})

					const dataBulanIni = foundData.filter(function (item){
						const day = new Date(item.tanggalPeriksa)
						const today = new Date()
						if (day.getMonth() === today.getMonth()) {
							return item
						}
					})

					const kapalLulus = foundData.filter(function (item){
						return item.hasil
					})

					const kapalTidakLulus = foundData.filter(function (item){
						return !(item.hasil)
					})
					const num = foundData.length
					res.render('home',{id: req.session.user._id, nama: data.nama,jumlah: num,dataHariIni: dataHariIni.length,dataBulanIni:dataBulanIni.length,kapalLulus:kapalLulus.length,kapalTidakLulus:kapalTidakLulus.length})
				}
			})
			
		}
		
	})
})

	
/**
 * Fungsi ini digunakan untuk merender halaman form
 *
*/
app.get('/form',checkSignIn,(req,res,next) => {
	res.render('form',{id: req.session.user._id})
	// res.sendFile(path.resolve(__dirname+'/views/form.ejs'))
})

/**
 * Fungsi ini digunakan untuk mengembalikan nilai inputan form ke dalam database
 *
 */
app.post("/form", (req,res) => {
	const result = (obj) => {
		for(key in obj){
			if(obj[key] === 'Tidak sesuai persyaratan'){
				return false
			}
		}
		return true
	}
	const tanggal = new Date()
	data = req.body
	data.tanggalPeriksa = tanggal
	data.hasil = result(req.body)
	data.idPetugas = req.session.user._id
	data.namaPetugas = req.session.user.nama
	// console.log(data)
	const dataKir = new DataKir(data)
	dataKir.save().then(item => {
		req.flash('success','Data pemeriksaan kapal berhasil ditambahkan')
		res.redirect('/riwayat')
	}).catch(err => {
		res.send(err)
	})
})
	
    // res.sendFile(path.resolve(__dirname +'/views/home.ejs'));

/**
*route method get untuk render halaman login
*localhost:3000/login
*/
app.get('/login',(req,res) => {
	res.render('login',{message : ""})
})


/**
*route method post untuk kirim data username dan password untuk di cek
*localhost:3000/login
*/
app.post('/login', (req, res) => {
	const username = req.body.username
	const password = req.body.password

	petugas.findOne({username: username},function(err,foundUser){
		if (err) {
			console.log(err)
		} else {
			if (foundUser) {
				bcrypt.compare(password,foundUser.password,function(err,result){
					if (result === true) {
						req.session.user = foundUser
						// console.log(foundUser)			
						res.redirect('/')
					} else{
						res.render('login', {message: "Username atau password salah"})				
					}
				})
			} else {
				res.render('login', {message: "Username atau password salah"})
			}
		}
	})
});

app.get("/info-hasil-periksa/:id",(req,res) =>{

	DataKir.find({_id: req.param("id")}, (err,data)=>{
		if (err) {
			res.send(err)
		} else {
			const doc = JSON.stringify(data)
			res.render('info-hasil-periksa',{data: doc })
		}
	})
})


/** 
*route method get untuk menghapus session ketika logout
*localhost:3000/logout
*/
app.get('/logout', (req, res) => {
	//hapus session
	req.session.destroy( () => {
	   console.log("user logged out.")
	});
	res.redirect('/login');
 });

app.get('/riwayat',checkSignIn, (req,res,next) => {

	DataKir.find({idPetugas: req.session.user._id}).sort({tanggalPeriksa : 'descending'}).exec((err,data)=>{
		if(err){
			res.send(err)
		} else {
			let dataDB = JSON.stringify(data)
			// dataDB = JSON.parse(dataDB)
			// console.log(dataDB.length)
			res.render('riwayat', {data: dataDB,id: req.session.user._id})
		}
	})
})

app.post('/:id',(req,res) =>{
	// console.log(req.body,req.params.id)
	petugas.findOne({_id: req.params.id},(err,foundUser) =>{
		if (err) {
			console.log(err)
		} else {
			bcrypt.compare(req.body.password,foundUser.password,(err,result) =>{
				if (result === true) {
					if (req.body.password1 === req.body.password2) {
						bcrypt.hash(req.body.password1,saltRounds,(err,hash) =>{
							foundUser.password = hash
							foundUser.save(function (err){
								if(err){
									console.log(err)
								} else {
									req.flash('success', 'Password anda berhasil diganti')
									res.redirect('/')
								}
							})
						})
					} else {
						res.send("gagal")
					}
				} else{
					res.send("password salah")				
				}
			})
		}
	})
})


app.use('/', (err, req, res, next) =>{
	console.log(err);
	   //User should be authenticated! Redirect him to log in.
	   res.redirect('/login');
});


// localhost:3000
app.listen(3000,  ()=> {
	console.log('Server started on port 3000')
})