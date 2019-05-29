const mongoose = require('mongoose')
// const passportLocalMongoose = require('passport-local-mongoose')

const adminSchema = new mongoose.Schema({
	username: String,
	password: String
})
// adminSchema.plugin(passportLocalMongoose)


const Admin = new mongoose.model("master",adminSchema,"master")

module.exports = Admin