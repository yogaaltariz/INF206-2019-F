const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')



const petugasSchema = new mongoose.Schema({
	NIP: String,
	nama: String,
	jk: String,
	alamat: String,
	email: String,
	username: String,
	password: String,
})

petugasSchema.plugin(passportLocalMongoose)

const Petugas = new mongoose.model("petugas",petugasSchema,"petugas")



module.exports = Petugas