const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

//set view engine menggunakan ejs
app.set("view engine","ejs")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

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
	jumlahABK: {
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
	}
})

petugasSchema = new mongoose.Schema({
	username : String,
    password : String,
    nama : String
})

const DataKir = mongoose.model("DataKir",ekirSchema)
const petugas = mongoose.model("petugas",petugasSchema)

//function
function checkSignIn(req, res,next){
	if(req.session.user){
	   next()     //If session exists, proceed to page
	} else {
	   const err = new Error("Not logged in!")
	   console.log(req.session.user)
	   next(err) //Error, trying to access unauthorized page!
	}
}


//set route
app.get('/',checkSignIn,function(req, res,next) {
	
	res.render('home',{id: req.session.user._id})
    // res.sendFile(path.resolve(__dirname +'/views/home.ejs'));
});

app.get('/login',function (req,res) {
	res.render('login',{message : ""})
})

app.post('/login', function(req, res){

	if(!req.body.username || !req.body.password){
	   res.render('login', {message: "Please enter both username and password"});
	} else {
		petugas.findOne({username: req.body.username},function(err,data){
			if (err) {
				res.render('login', {message: "Username atau id salah"})
			} else {
				if (data.username === req.body.username && data.password === req.body.password) {
					req.session.user = data
					res.redirect("/")
				} else {
					res.render('login', {message: "Username atau id salah"})
				}
			}
		})   
	}
});

app.get("/info-hasil-periksa/:id",function(req,res) {

	DataKir.find({_id: req.param("id")}, function (err,data){
		if (err) {
			res.send(err)
		} else {
			const doc = JSON.stringify(data)
			res.render('info-hasil-periksa',{data: doc })
		}
	})
})

app.get('/logout', function(req, res){
	req.session.destroy(function(){
	   console.log("user logged out.")
	});
	res.redirect('/login');
 });




app.use('/', function(err, req, res, next){
	console.log(err);
	   //User should be authenticated! Redirect him to log in.
	   res.redirect('/login');
});


// localhost:3000
app.listen(3000, function () {
	console.log('Server started on port 3000')
})