const mongoose = require('mongoose')
const Petugas = require('./petugas')

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
	},
	idPetugas:{
		type: String,
		required: [true,'tidak ada idPetugas']
	},
	namaPetugas:{
		type:String,
		required:[true,'tidak ada nama petugas']
	}
})


const DataKir = mongoose.model("DataKir",ekirSchema)

module.exports = DataKir
