// for AUTHENTICATION
var mongoose              = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");



var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});



UserSchema.plugin(passportLocalMongoose); // adds methods to our SCHEMA

module.exports = mongoose.model("User", UserSchema);
